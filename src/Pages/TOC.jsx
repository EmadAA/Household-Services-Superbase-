import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow w-[90%] sm:w-[85%] md:w-[80%] lg:w-[1300px] mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Please read these Terms and Conditions carefully before using our
          platform or services.
        </p>

        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-200 leading-relaxed space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600">
              Welcome to our service platform. By using our website or mobile
              application, you agree to comply with and be bound by these Terms
              and Conditions. If you do not agree, please do not use our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Service Usage
            </h2>
            <p className="text-gray-600">
              Our platform connects users with verified technicians and service
              providers. You agree to use the platform only for lawful purposes
              and not to misuse any service, data, or system connected to it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. User Responsibilities
            </h2>
            <p className="text-gray-600">
              Users must provide accurate information during registration and
              booking. You are responsible for maintaining the confidentiality
              of your account and for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Technician Responsibilities
            </h2>
            <p className="text-gray-600">
              Technicians must complete assigned tasks honestly and
              professionally. Misconduct, misrepresentation, or failure to
              complete a task may result in suspension or permanent removal from
              the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Payment & Refund Policy
            </h2>
            <p className="text-gray-600">
              Payments should be made through authorized methods only. Refunds
              (if applicable) will be processed based on service status and
              admin approval. Unauthorized transactions or disputes must be
              reported immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Cancellations
            </h2>
            <p className="text-gray-600">
              Users can cancel bookings before a technician accepts the task.
              Once a technician has been assigned or service has started,
              cancellation may incur charges or be restricted entirely depending
              on the situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Reviews & Feedback
            </h2>
            <p className="text-gray-600">
              All reviews should be honest and respectful. We reserve the right
              to remove any content that is offensive, misleading, or violates
              community standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              We are not liable for any direct, indirect, or consequential
              damages resulting from service delays, technician misconduct, or
              user-provided misinformation. Our responsibility is limited to
              managing platform operations and ensuring fair conduct.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              9. Privacy Policy
            </h2>
            <p className="text-gray-600">
              Your data is stored securely and used only for providing better
              service experiences. We never sell or share personal data with
              third parties without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              10. Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to update or modify these Terms & Conditions
              at any time. You are encouraged to review this page periodically
              for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              11. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us via
              email at{" "}
              <a
                href="mailto:household@info.com"
                className="text-blue-600 underline"
              >
                household@info.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
