import Stripe from 'stripe';
import * as Yup from 'yup';
import Booking from '../models/Booking';
import Villa from '../models/Villa';
import CancellationRequest from '../models/CancelBooking';
import { NotFoundError, ValidationError } from '../utils/ApiError';

const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

const cancellationRequestController = {
  createRequest: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        booking_id: Yup.number().required(),
        reason: Yup.string().nullable(),
      });

      await schema.validate(req.body);

      const { booking_id, reason } = req.body;

      const booking = await Booking.findByPk(booking_id);
      if (!booking) {
        throw new NotFoundError('Booking not found');
      }

      const cancellationRequest = await CancellationRequest.create({
        booking_id,
        reason,
        status: 'pending',
      });

      return res.status(201).json(cancellationRequest);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        return res.status(400).json({ errors });
      }
      next(error);
    }
  },

  getAllRequests: async (req, res, next) => {
    try {
      const requests = await CancellationRequest.findAll({
        include: [
          {
            model: Booking,
            as: 'Booking',
          },
        ],
      });
      return res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  },

  approveRequest: async (req, res, next) => {
    try {
      const { id } = req.params;

      const request = await CancellationRequest.findByPk(id, {
        include: [
          {
            model: Booking,
            as: 'Booking',
          },
        ],
      });

      
      if (!request) {
        throw new NotFoundError('Cancellation request not found');
      }
      
      const { Booking: booking } = request;

      console.log(booking.dataValues)

      if (!booking.dataValues.payment_id) {
        throw new ValidationError('Booking does not have a valid payment ID');
      }

      // Retrieve the payment intent using the session_id
      const session = await stripe.checkout.sessions.retrieve(booking.dataValues.payment_id);
      const paymentIntentId = session.payment_intent;

      if (!paymentIntentId) {
        throw new ValidationError('No payment intent found for this session');
      }

      // Issue a refund using Stripe
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
      });

      const villa = await Villa.findByPk(booking.dataValues.property_id);
      villa.is_rented = false;
      villa.rent_start = null;
      villa.rent_end = null;

      await villa.save();
      await Booking.destroy({
        where: { id: booking.dataValues.id }, 
    });


      request.status = 'approved';
      await request.save();

      return res.status(200).json({ request, refund });
    } catch (error) {
      next(error);
    }
  },


  denyRequest: async (req, res, next) => {
    try {
      const { id } = req.params;

      const request = await CancellationRequest.findByPk(id);
      if (!request) {
        throw new NotFoundError('Cancellation request not found');
      }

      request.status = 'denied';
      await request.save();

      return res.status(200).json(request);
    } catch (error) {
      next(error);
    }
  },
};

export default cancellationRequestController;
