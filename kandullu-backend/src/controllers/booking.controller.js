import Sequelize from 'sequelize';
import Stripe from 'stripe';
import * as Yup from 'yup';
import Booking from '../models/Booking';
import User from '../models/User';
import Villa from '../models/Villa';
import { NotFoundError, ValidationError } from '../utils/ApiError';
import MailerService from '../utils/MailerSerice';
import _ from 'lodash';
import dayjs from 'dayjs';


const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

const {Op} = Sequelize

const bookingController = {
  add: async (req, res, next) => {
    console.log(req.body);
    try {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
            end_date: Yup.date().required(),
            property_id: Yup.number().required(),
            payment_type: Yup.string()
                .oneOf(['half_payment', 'full_payment'])
                .required(),
            amount: Yup.number().required(),
            pending_amount: Yup.number().nullable(),
            user_id: Yup.number().required(),
            guests: Yup.object().shape({
                adults: Yup.number(),
                child: Yup.number(),
                infants: Yup.number(),
            }).required(),
            is_paid_partially: Yup.boolean().default(false),
            is_paid: Yup.boolean().default(false),
        });

        await schema.validate(req.body);

        const { start_date, end_date, property_id } = req.body;

        // Check if there are existing bookings overlapping with the specified date range
        const existingBookings = await Booking.findAll({
            where: {
                property_id,
                [Op.or]: [
                    {
                        start_date: {
                            [Op.between]: [start_date, end_date],
                        },
                    },
                    {
                        end_date: {
                            [Op.between]: [start_date, end_date],
                        },
                    },
                    {
                        [Op.and]: [
                            {
                                start_date: {
                                    [Op.lte]: start_date,
                                },
                            },
                            {
                                end_date: {
                                    [Op.gte]: end_date,
                                },
                            },
                        ],
                    },
                ],
            },
        });

        if (existingBookings.length > 0) {
            const latestEndDate = _.maxBy(existingBookings, 'end_date').end_date;
            const nearestAvailableDate = dayjs(latestEndDate).add(1, 'day').format('YYYY-MM-DD');

            return res.status(400).json({
                message: `The villa you are trying to book has already been reserved. The nearest available date is ${nearestAvailableDate}.`,
            });
        }

        // Continue with booking creation
        const booking = await Booking.create(req.body);

        // Check if user exists
        const { user_id, amount } = req.body;
        const user = await User.findByPk(user_id);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const customer = await stripe.customers.create({
            name: user.name,
            email: user.email,
        });

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Booking Payment',
                        },
                        unit_amount: amount * 100, // amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}&bookingId=${booking.id}`,
            cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
        });

        return res.status(201).json({ url: session.url });
    } catch (error) {
        console.error(error);
        next(error);
    }
},
	addBooking: async (req, res, next) => {
		try {
			const schema = Yup.object().shape({
				booking_id: Yup.string().required(),
				session_id: Yup.string().required(),
			});

			await schema.validate(req.body);

      const {booking_id, session_id} = req.body

			const booking = await Booking.findByPk(booking_id);
			if (!booking) {
				throw new NotFoundError('Booking not found');
			}
      
      booking.payment_id = session_id
      booking.is_paid_partially = booking.payment_type === 'half_payment'
      booking.is_paid = booking.payment_type === 'full_payment'

      await booking.save();

      const villa = await Villa.findByPk(booking.property_id);
      if (!villa) {
        throw new NotFoundError('Villa not found');
      }

      // Update Villa status
      villa.is_rented = true;
      villa.rent_start = booking.start_date;
      villa.rent_end = booking.end_date;

      await villa.save();

      (await villa).save();


      await MailerService('raufshakeel@gmail.com', 'Booking successful', `your booking id is: ${booking_id}`)
			return res.status(200).json(booking);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},


  addBookingError: async (req, res, next) => {
		try {
			const schema = Yup.object().shape({
				booking_id: Yup.string().required(),
			});

			await schema.validate(req.body);

      const {booking_id} = req.body

			const booking = await Booking.findByPk(booking_id);
			if (!booking) {
				throw new NotFoundError('Booking not found');
			}
      booking.destroy()
			return res.status(200).json(booking);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},

	// Get all bookings
	getAllBookings: async (req, res, next) => {
		try {
			const bookings = await Booking.findAll({
          include: [
            {
                model: User,
                as: 'User',
            },
            {
                model: Villa,
                as: 'Villa',
            },
				],
			});

			return res.status(200).json(bookings);
		} catch (error) {
			next(error);
		}
	},

	getBookingById: async (req, res, next) => {
		try {
			const { id } = req.params;
			const booking = await Booking.findByPk(id);
			if (!booking) {
				throw new NotFoundError('Booking not found');
			}
			return res.status(200).json(booking);
		} catch (error) {
			next(error);
		}
	},

	updateBooking: async (req, res, next) => {
		try {
			const { id } = req.params;

			const schema = Yup.object().shape({
				start_date: Yup.date(),
				end_date: Yup.date(),
				property_id: Yup.number(),
				payment_type: Yup.string().oneOf(['half_payment', 'full_payment']),
				amount: Yup.number(),
				pending_amount: Yup.number().nullable(),
				userId: Yup.number(),
			});

			if (!(await schema.isValid(req.body))) {
				throw new ValidationError('Validation failed');
			}

			const booking = await Booking.findByPk(id);
			if (!booking) {
				throw new NotFoundError('Booking not found');
			}

			await booking.update(req.body);

			return res.status(200).json(booking);
		} catch (error) {
			next(error);
		}
	},

	// Delete a booking by ID
	deleteBooking: async (req, res, next) => {
		try {
			const { id } = req.params;

			const booking = await Booking.findByPk(id);
			if (!booking) {
				throw new NotFoundError('Booking not found');
			}

			await booking.destroy();

			return res.status(204).end();
		} catch (error) {
			next(error);
		}
	},

	checkAvailability: async (req, res, next) => {
		try {
			const schema = Yup.object().shape({
				property_id: Yup.number().required(),
				rent_start: Yup.date().required(),
				rent_end: Yup.date().required(),
			});

			if (!(await schema.isValid(req.body))) {
				throw new ValidationError('Validation failed');
			}

			const { property_id, rent_start, rent_end } = req.body;

			// Check if the villa is available within the given date range
			const availableVilla = await Villa.findOne({
				where: {
					id: property_id,
					is_rented: false,
					[Sequelize.Op.or]: [
						{
							rent_start: null,
							rent_end: null,
						},
						{
							rent_start: {
								[Sequelize.Op.gt]: rent_end,
							},
						},
						{
							rent_end: {
								[Sequelize.Op.lt]: rent_start,
							},
						},
					],
				},
			});

			if (!availableVilla) {
				return res.status(200).json({ available: false });
			}

			return res.status(200).json({ available: true });
		} catch (error) {
			next(error);
		}
	},

getBookingsByUser: async (req, res, next) => {
  try {
      const { id } = req.params;

      const bookings = await Booking.findAll({
          where: {
              user_id: id,
          },
          include: [
              {
                  model: User,
                  as: 'User',
              },
              {
                  model: Villa,
                  as: 'Villa',
              },
          ],
      });

      if (!bookings || bookings.length === 0) {
         res.send([]);
      }

      return res.status(200).json(bookings);
  } catch (error) {
      next(error);
  }
},

};

export default bookingController;
