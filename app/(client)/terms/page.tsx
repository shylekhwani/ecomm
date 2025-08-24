import { Logo } from "@/components/header/Logo";
import { Card, CardContent } from "@/components/ui/card";


export default function TermsAndConditionsPage() {
  return (
    <section className="flex justify-center py-10 px-4">
      <Card className="max-w-4xl w-full shadow-xl border-2 border-gray-200 rounded-2xl">
        <CardContent className="p-8 space-y-6 text-gray-700">
          <header className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-sm text-gray-500">Last updated: {"2 Days Ago"}</p>
          </header>

          <p>
            These Terms & Conditions (“Terms”) govern your access to and use of the
            <Logo/> website, products, and services (“Services”). By using our
            Services, you agree to be bound by these Terms.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">1. Eligibility</h2>
            <p>
              You must be at least the age of majority in your jurisdiction to use the
              Services. By using the Services, you represent and warrant that you meet
              this requirement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">2. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities under your account. Notify us
              immediately if you suspect unauthorized use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">3. Orders & Payments</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>All prices are shown prior to checkout and may include applicable taxes.</li>
              <li>We reserve the right to refuse or cancel orders at our discretion.</li>
              <li>
                By placing an order, you authorize us (and our payment processors) to charge
                the payment method provided.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">4. Shipping & Returns</h2>
            <p>
              Shipping times are estimates and may vary. Returns and refunds are governed
              by our Return Policy (if provided on the site). Items must be returned in
              original condition unless otherwise stated.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">5. Acceptable Use</h2>
            <p>
              You agree not to misuse the Services, including but not limited to: reverse
              engineering, interfering with security, scraping without permission, or
              using the Services for unlawful activities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">6. Intellectual Property</h2>
            <p>
              All content, trademarks, and materials on the Services are owned by or
              licensed to <Logo/>. You may not copy, modify, or distribute content
              without permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">7. Disclaimers</h2>
            <p>
              The Services are provided “as is” and “as available.” We disclaim all
              warranties to the fullest extent permitted by law, including implied
              warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, <Logo/> shall not be liable
              for indirect, incidental, special, or consequential damages, or any loss of
              profits or revenues.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">9. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Services
              after changes become effective constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">10. Contact</h2>
            <p>
              Questions? Reach us at{" "}
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
