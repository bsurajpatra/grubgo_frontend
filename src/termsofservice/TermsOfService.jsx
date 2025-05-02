import React from 'react';
import './TermsOfService.css';
import Header from '../header/Header';

function TermsOfService() {
  return (
    <>
      <Header />
      <div className="terms-container">
        <h1>Terms of Service</h1>
        <h2>1. Introduction</h2>
        <p>GrubGo is a community-driven food delivery platform that connects customers with local restaurants and delivery partners. We aim to provide an affordable, transparent, and sustainable food ordering experience.</p>
        <p>By using GrubGo, you agree to these Terms and our Privacy Policy. If you do not agree, please do not use the platform.</p>

        <h2>2. User Roles & Responsibilities</h2>
        <h3>A. Customers</h3>
        <ul>
          <li>Must provide accurate information when creating an account.</li>
          <li>Are responsible for checking order details before confirming a purchase.</li>
          <li>Agree to make timely payments and follow refund/cancellation policies.</li>
          <li>Must treat restaurant staff and delivery partners respectfully.</li>
        </ul>
        <h3>B. Restaurant Owners</h3>
        <ul>
          <li>Must ensure that the menu, prices, and business information are accurate.</li>
          <li>Are responsible for food quality, hygiene, and timely order fulfillment.</li>
          <li>Agree to the commission structure and payment terms set by GrubGo.</li>
          <li>Must not engage in fraudulent activities or unauthorized modifications.</li>
        </ul>
        <h3>C. Delivery Partners</h3>
        <ul>
          <li>Must deliver food orders safely and on time.</li>
          <li>Are responsible for maintaining professionalism and customer service standards.</li>
          <li>Should comply with local traffic laws and safety regulations.</li>
          <li>Agree to the payout structure set by GrubGo.</li>
        </ul>

        <h2>3. Payments & Fees</h2>
        <p>Customers agree to pay the total price displayed at checkout, including taxes and delivery charges.</p>
        <p>Restaurants are subject to a minimal commission fee per order.</p>
        <p>Delivery partners will receive earnings based on completed deliveries.</p>
        <p>Refunds and cancellations are subject to GrubGo's Refund Policy.</p>

        <h2>4. Order & Delivery Policy</h2>
        <p>Once an order is placed, it cannot be canceled after the restaurant begins preparation.</p>
        <p>Estimated delivery times are approximate and may vary due to external factors.</p>
        <p>If an order is delayed or not delivered, customers can contact support for resolution.</p>
        <p>GrubGo is not responsible for food quality but will mediate disputes between customers and restaurants.</p>

        <h2>5. Community-Driven Governance</h2>
        <p>GrubGo operates as a community-driven platform, where local restaurant owners and delivery partners contribute to decisions:</p>
        <ul>
          <li>Commission rates, delivery charges, and operational policies may be adjusted by the Community Presidents in each locality.</li>
          <li>Community Governance Fees (if applicable) will be transparently communicated.</li>
          <li>Restaurants and delivery workers can propose improvements to enhance platform efficiency.</li>
        </ul>

        <h2>6. Prohibited Activities</h2>
        <p>Users agree NOT to:</p>
        <ul>
          <li>Use the platform for fraudulent, illegal, or unethical activities.</li>
          <li>Misuse discount codes, referral programs, or promotional offers.</li>
          <li>Engage in harassment, threats, or offensive behavior towards other users.</li>
          <li>Post fake reviews or misleading business information.</li>
          <li>Attempt to hack, modify, or exploit the platform in any way.</li>
        </ul>

        <h2>7. Account Termination</h2>
        <p>GrubGo reserves the right to suspend or terminate accounts without prior notice if users violate these Terms. Common reasons for termination include:</p>
        <ul>
          <li>Fraudulent transactions.</li>
          <li>Multiple complaints of misconduct.</li>
          <li>Abusing platform policies or engaging in unlawful activities.</li>
        </ul>

        <h2>8. Limitation of Liability</h2>
        <p>GrubGo does not guarantee uninterrupted access to the platform due to potential technical or third-party service disruptions.</p>
        <p>We are not liable for food quality issues, but we facilitate dispute resolution between customers and restaurants.</p>
        <p>Delivery partners act as independent contractors, and GrubGo is not responsible for any accidents or mishaps during delivery.</p>

        <h2>9. Privacy & Data Protection</h2>
        <p>Your personal information is protected under our Privacy Policy.</p>
        <p>We do not sell your data to third parties.</p>
        <p>Payment information is securely processed through trusted payment gateways.</p>

        <h2>10. Changes to Terms</h2>
        <p>GrubGo may update these Terms periodically. Continued use of the platform after modifications implies acceptance of the revised Terms.</p>

        <h2>11. Contact Information</h2>
        <p>For any questions or concerns regarding these Terms, please contact us at:</p>
        <p>📧 Email: grubgo@gmail.com 📞 Phone: +91 94928 32734</p>
        <p></p>
      </div>
   
    </>
  );
}

export default TermsOfService;