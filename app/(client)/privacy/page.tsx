import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/header/Logo";

export default function PrivacyPolicyPage() {
  return (
    <section className="flex justify-center py-10 px-4">
      <Card className="max-w-4xl w-full shadow-xl border-2 border-gray-200 rounded-2xl">
        <CardContent className="p-8 space-y-6 text-gray-700">
          <header className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: {"2 Days Ago"}</p>
          </header>

          <p>
            This Privacy Policy explains how <Logo/> (“we”, “us”, “our”) collects,
            uses, and protects your personal information when you use our website and
            Services.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">Account & Contact Info:</span> name, email,
                shipping address.
              </li>
              <li>
                <span className="font-medium">Order Details:</span> products purchased,
                totals, invoices.
              </li>
              <li>
                <span className="font-medium">Technical Data:</span> IP address, device,
                browser, and usage analytics.
              </li>
              <li>
                <span className="font-medium">Payment Info:</span> handled securely by our
                payment processors; we do not store full card details.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">2. How We Use Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Process and deliver orders.</li>
              <li>Provide customer support and service updates.</li>
              <li>Improve, personalize, and secure our Services.</li>
              <li>Comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">3. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to remember preferences,
              authenticate users, and analyze traffic. You can manage cookies via your
              browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">4. Sharing of Information</h2>
            <p>
              We may share information with trusted vendors (e.g., payment processors,
              shipping partners) to operate the Services. We do not sell your personal
              information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">5. Data Security</h2>
            <p>
              We implement reasonable safeguards to protect your information. However, no
              method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, or
              delete your data, and to object or restrict certain processing. Contact us
              to exercise these rights.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">7. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary to fulfill the
              purposes outlined in this Policy and to comply with legal obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">8. Children’s Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 13 (or the age
              required by local law). We do not knowingly collect personal information
              from children.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">9. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We’ll post the updated
              version with a new “Last updated” date at the top.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">10. Contact</h2>
            <p>
              For questions or requests, contact{" "}
              <a className="text-blue-600 underline" href={`mailto:Trendora@gmail.com`}>
                Trendora@gmail.com
              </a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  );
}
