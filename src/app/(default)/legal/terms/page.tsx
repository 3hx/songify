"use client";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

      <div className="prose prose-stone max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using our services, you agree to be bound by these
            Terms and Conditions. If you disagree with any part of these terms,
            you may not access our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Custom Song Services
          </h2>
          <p>
            We create personalized songs based on information you provide. By
            submitting content for your song, you:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Grant us permission to use the content for creating your song
            </li>
            <li>
              Confirm you have the right to share any information provided
            </li>
            <li>
              Understand that final creative decisions rest with our artists
            </li>
            <li>Accept that delivery times are estimates and may vary</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Intellectual Property
          </h2>
          <p>
            Upon full payment, you receive a license to use the song for
            personal, non-commercial purposes. We retain the underlying
            copyright and intellectual property rights to all songs created.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Revisions and Refunds
          </h2>
          <p>
            We offer limited revisions as specified in your package. Refunds are
            handled on a case-by-case basis and are not guaranteed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Limitation of Liability
          </h2>
          <p>
            We strive to provide the best service possible but cannot guarantee
            complete satisfaction. Our liability is limited to the amount paid
            for the service.
          </p>
        </section>
      </div>
    </div>
  );
}
