"use client";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-stone max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Contact information (name, email, phone number)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Song details and personal stories you share</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Create your personalized song</li>
            <li>Process your payment</li>
            <li>Communicate with you about your order</li>
            <li>Improve our services</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Information Sharing
          </h2>
          <p>
            We do not sell your personal information. We share your information
            only with:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Our team members involved in creating your song</li>
            <li>Payment processors (Stripe)</li>
            <li>Service providers who assist our operations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the Internet is
            100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
