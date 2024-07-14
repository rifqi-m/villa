import { Router } from "express";
import bookingController from "../controllers/booking.controller";

const bookingRoutes = Router();
bookingRoutes.post("/booking", bookingController.add);
bookingRoutes.delete("/booking/:id", bookingController.deleteBooking);
bookingRoutes.get("/booking", bookingController.getAllBookings);
bookingRoutes.get("/booking/:id", bookingController.getBookingById);
bookingRoutes.put("/booking/:id", bookingController.updateBooking);

bookingRoutes.post("/booking-success", bookingController.addBooking);
bookingRoutes.post("/booking-error", bookingController.addBookingError);

bookingRoutes.post('/booking/check-availability', bookingController.checkAvailability);
bookingRoutes.get('/booking/user-bookings/:id', bookingController.getBookingsByUser);

export { bookingRoutes };
