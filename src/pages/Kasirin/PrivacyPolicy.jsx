import "./privacy.css";

const LAST_UPDATED = "July 27, 2026";

export default function KasirinPrivacyPolicy() {
  return (
    <div className="kasirin-pp">
      <header className="kasirin-pp__header">
        <p className="kasirin-pp__brand">Kasirin</p>
        <h1>Privacy Policy</h1>
        <p className="kasirin-pp__meta">Last updated: {LAST_UPDATED}</p>
      </header>

      <article className="kasirin-pp__body">
        <p>
          Kasirin (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a Point of Sale (POS)
          application for merchants. This Privacy Policy explains how we collect,
          use, store, and protect information when you use the Kasirin Apps
          (mobile and web).
        </p>

        <h2>1. Information We Collect</h2>
        <p>Depending on how you use Kasirin, we may collect:</p>
        <ul>
          <li>
            <strong>Account data</strong> — name, email, phone number, business
            name, and login credentials.
          </li>
          <li>
            <strong>Business &amp; POS data</strong> — products, inventory,
            prices, sales transactions, receipts, customers, staff accounts, and
            related operational records you enter into the app.
          </li>
          <li>
            <strong>Device &amp; usage data</strong> — device type, OS version,
            app version, IP address, crash logs, and feature usage to improve
            stability and performance.
          </li>
          <li>
            <strong>Payment-related data</strong> — payment method metadata and
            transaction status processed through integrated payment providers
            (we do not store full card numbers on our servers when payments are
            handled by third-party processors).
          </li>
        </ul>

        <h2>2. How We Use Information</h2>
        <ul>
          <li>Provide and operate Kasirin POS features (sales, inventory, reports).</li>
          <li>Create and manage merchant accounts and staff access.</li>
          <li>Process transactions and generate receipts/reports.</li>
          <li>Send service notices, security alerts, and product updates.</li>
          <li>Improve app performance, fix bugs, and prevent fraud/abuse.</li>
          <li>Comply with legal obligations where required.</li>
        </ul>

        <h2>3. Legal Basis (Where Applicable)</h2>
        <p>
          We process personal data based on contract performance (to deliver the
          service), legitimate interests (security, product improvement),
          consent (where required), and legal compliance.
        </p>

        <h2>4. Sharing of Information</h2>
        <p>We do not sell your personal data. We may share data with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> — cloud hosting, analytics, crash
            reporting, email/SMS, and payment processors that help run Kasirin.
          </li>
          <li>
            <strong>Business partners you choose</strong> — e.g. payment
            gateways or printers you connect.
          </li>
          <li>
            <strong>Authorities</strong> — when required by law, regulation, or
            valid legal process.
          </li>
        </ul>
        <p>
          Providers are only allowed to process data as needed to perform
          services for us and must protect it appropriately.
        </p>

        <h2>5. Data Storage &amp; Security</h2>
        <p>
          Data is stored on secured servers and protected with industry-standard
          measures (encryption in transit, access controls, and monitoring). No
          method of transmission or storage is 100% secure; we continuously work
          to improve safeguards.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain account and transaction data for as long as your account is
          active and as needed for legal, tax, accounting, and dispute purposes.
          You may request deletion subject to those obligations.
        </p>

        <h2>7. Your Rights</h2>
        <p>Subject to applicable law, you may request to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Delete your data (where legally allowed)</li>
          <li>Export/port your data</li>
          <li>Withdraw consent where processing is consent-based</li>
        </ul>
        <p>Contact us using the details below to exercise these rights.</p>

        <h2>8. Children</h2>
        <p>
          Kasirin is a business POS product and is not directed at children under
          13 (or the minimum age required in your jurisdiction). We do not
          knowingly collect personal data from children.
        </p>

        <h2>9. International Transfers</h2>
        <p>
          If data is processed outside your country, we take steps to ensure
          appropriate safeguards consistent with applicable privacy laws.
        </p>

        <h2>10. Third-Party Services</h2>
        <p>
          Kasirin may link to or integrate third-party services (payment,
          maps, analytics). Their privacy practices are governed by their own
          policies. Review those policies before use.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes
          will be posted on this page with an updated &quot;Last updated&quot;
          date. Continued use of Kasirin after changes means you accept the
          revised policy.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          Questions about this Privacy Policy or Kasirin data practices:
        </p>
        <ul>
          <li>App: Kasirin (POS)</li>
          <li>Email: privacy@kasirin.app</li>
        </ul>
      </article>
    </div>
  );
}
