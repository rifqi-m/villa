function PageHome3() {
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <div className="container relative space-y-24 mb-24 ">
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <div className="prose">
              <h2>Introduction</h2>
              <p>
                Welcome to Villas Kandulu. These terms and conditions outline
                the rules and regulations for the use of our website and
                services.
              </p>

              <h3>Booking and Payment</h3>
              <p>
                By making a reservation with us, you agree to the following
                terms:
              </p>
              <ul>
                <li>
                  All bookings require a valid credit card to guarantee the
                  reservation.
                </li>
                <li>
                  Full payment is required upon arrival unless stated otherwise
                  in your booking confirmation.
                </li>
                <li>
                  We accept all major credit cards and online payment methods.
                </li>
              </ul>

              <h3>Cancellation Policy</h3>
              <p>
                Our cancellation policy varies depending on the type of booking:
              </p>
              <ul>
                <li>
                  For standard bookings, cancellations made 48 hours before the
                  arrival date will receive a full refund.
                </li>
                <li>
                  For non-refundable bookings, no refund will be issued in case
                  of cancellation.
                </li>
                <li>
                  For group bookings, please refer to the specific terms
                  provided at the time of booking.
                </li>
              </ul>

              <h3>Check-In and Check-Out</h3>
              <p>
                Check-in time is from 3 PM, and check-out time is by 11 AM.
                Early check-in and late check-out are subject to availability
                and may incur additional charges.
              </p>

              <h3>Use of Facilities</h3>
              <p>
                Guests are expected to use the facilities responsibly. Any
                damage caused to the property will be charged to the guest's
                account.
              </p>

              <h3>Privacy Policy</h3>
              <p>
                We value your privacy. Please read our privacy policy to
                understand how we collect, use, and protect your personal
                information.
              </p>

              <h3>Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in
                accordance with the laws of Costa Rica. Any disputes arising out
                of or related to the use of our services will be subject to the
                exclusive jurisdiction of the courts of Costa Rica.
              </p>

              <h3>Contact Us</h3>
              <p>
                If you have any questions or concerns about these terms and
                conditions, please contact us:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@villaskandulu.com"
                    className="text-blue-500 underline"
                  >
                    info@villaskandulu.com
                  </a>
                </li>
                <li>Phone: +506 6425 9581</li>
                <li>Address: Luna Tica, Puerto Viejo, Limón, Costa Rica</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageHome3;
