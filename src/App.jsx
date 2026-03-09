import React from 'react';
const services = [
  {
    title: 'Express Entry Support',
    description:
      'Profile strategy, document preparation, and post-ITA application support for skilled workers.',
  },
  {
    title: 'Family Sponsorship',
    description:
      'End-to-end support for spousal, common-law, and dependent child sponsorship applications.',
  },
  {
    title: 'Study & Work Pathways',
    description:
      'Customized planning for study permits, PGWP transitions, and pathways to permanent residence.',
  },
  {
    title: 'Compliance & Representation',
    description:
      'Professional representation before IRCC with accurate filings and timely communication.',
  },
];

const process = [
  {
    step: '1. Discovery Call',
    text: 'We assess your goals, eligibility, and timelines in a 30-minute consultation.',
  },
  {
    step: '2. Strategy Plan',
    text: 'You receive a clear roadmap with scope, required documents, and fixed professional fees.',
  },
  {
    step: '3. File Preparation',
    text: 'We build a complete, compliant application package and guide every submission step.',
  },
  {
    step: '4. Ongoing Support',
    text: 'You get updates, deadline reminders, and direct RCIC guidance until decision.',
  },
];

export default function App() {
  return (
    <div>
      <header className="hero">
        <nav className="nav">
          <p className="brand">North Maple Immigration Consulting Inc.</p>
          <a href="#contact" className="cta-link">
            Book Consultation
          </a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Solo Incorporated RCIC Practice</p>
          <h1>
            Trusted Canadian Immigration Guidance with Direct RCIC Representation
          </h1>
          <p>
            I am <strong>Alex Chen, RCIC (R123456)</strong>, founder and principal consultant. I
            provide personalized, ethical, and transparent immigration consulting services for
            individuals and families moving to Canada.
          </p>
          <div className="hero-actions">
            <a href="#services" className="button primary">
              Explore Services
            </a>
            <a href="#about" className="button secondary">
              Meet Your Consultant
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="services" className="section">
          <h2>Immigration Services</h2>
          <div className="grid">
            {services.map((service) => (
              <article key={service.title} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section alt">
          <div className="split">
            <div>
              <h2>About the Firm</h2>
              <p>
                North Maple Immigration Consulting Inc. is a solo incorporated practice focused on
                client-first immigration support. Every file is handled directly by the RCIC—never
                outsourced.
              </p>
              <ul>
                <li>Member in good standing with CICC</li>
                <li>Clear engagement agreements and fee transparency</li>
                <li>Service in English and Mandarin</li>
              </ul>
            </div>
            <aside className="highlight">
              <h3>Why Clients Choose Us</h3>
              <p>
                You receive direct communication, a strategy tailored to your profile, and
                practical advice based on current IRCC policy.
              </p>
            </aside>
          </div>
        </section>

        <section className="section">
          <h2>How We Work</h2>
          <div className="timeline">
            {process.map((item) => (
              <article key={item.step} className="timeline-item">
                <h3>{item.step}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2>Book a Consultation</h2>
          <p>
            Start with a focused assessment of your immigration options. Consultation summaries are
            provided in writing.
          </p>
          <div className="contact-card">
            <p>
              <strong>Email:</strong> hello@northmaplercic.ca
            </p>
            <p>
              <strong>Phone:</strong> +1 (416) 555-0147
            </p>
            <p>
              <strong>Location:</strong> Toronto, Ontario (Virtual Consultations Across Canada &
              Abroad)
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} North Maple Immigration Consulting Inc. All rights reserved.</p>
        <p>This website is for informational purposes and does not constitute legal advice.</p>
      </footer>
    </div>
  );
}
