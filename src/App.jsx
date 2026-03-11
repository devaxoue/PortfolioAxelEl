import React, { useEffect, useMemo, useRef, useState } from 'react';

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

const journeyStages = [
  {
    title: 'Stage 1: Starting Alone',
    text: 'Navigating forms, deadlines, and policies without guidance created avoidable risks and delays.',
  },
  {
    title: 'Stage 2: Building Clarity',
    text: 'Turning lived experience into a structured framework proved that precise advice can prevent costly mistakes.',
  },
  {
    title: 'Stage 3: Supporting Others',
    text: 'Gooslex focuses on key decision points so people get timely direction when it matters most.',
  },
];

function maplePathPoints(width, stagesCount) {
  const centerX = width * 0.5;
  const edgePadding = Math.max(58, width * 0.1);
  const leftX = edgePadding;
  const rightX = width - edgePadding;
  const segmentHeight = 240;
  const all = [{ x: centerX, y: 24 }];

  for (let i = 0; i < stagesCount; i += 1) {
    const from = i === 0 ? centerX : i % 2 === 1 ? leftX : rightX;
    const to = i % 2 === 0 ? leftX : rightX;
    const yStart = i * segmentHeight + 24;
    const yEnd = (i + 1) * segmentHeight + 24;
    const count = 45;

    for (let t = 1; t <= count; t += 1) {
      const progress = t / count;
      const sway = Math.sin(progress * Math.PI * (1.5 + i * 0.35)) * (28 + i * 6);
      const deterministicNoise =
        Math.sin((t + 1) * 0.93 + i * 2.1) * 10 + Math.cos((t + 3) * 0.41 + i) * 6;
      all.push({
        x: from + (to - from) * progress + sway + deterministicNoise,
        y: yStart + (yEnd - yStart) * progress,
      });
    }
  }

  return all;
}

function PersonalJourney() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerWidth, setContainerWidth] = useState(820);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const available = rect.height - window.innerHeight * 0.35;
      const travelled = window.innerHeight * 0.6 - rect.top;
      const nextProgress = available > 0 ? travelled / available : 0;
      setScrollProgress(Math.max(0, Math.min(1, nextProgress)));
      setContainerWidth(sectionRef.current.clientWidth);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const pathPoints = useMemo(
    () => maplePathPoints(containerWidth, journeyStages.length),
    [containerWidth],
  );

  const visiblePoints = Math.max(1, Math.floor(scrollProgress * (pathPoints.length - 1)) + 1);
  const leafPoint = pathPoints[Math.min(pathPoints.length - 1, visiblePoints - 1)];
  const stageProgress = scrollProgress * journeyStages.length;

  return (
    <section className="section journey" ref={sectionRef}>
      <h2>Personal Journey</h2>
      <p className="journey-intro">
        A journey that shaped a different kind of immigration service
        <br />
        Gooslex was built from lived experience: navigating immigration alone, learning through
        mistakes, and realizing how many people need precise guidance at key decision points—not
        necessarily full-service representation.
      </p>

      <div className="journey-canvas" style={{ height: `${journeyStages.length * 240 + 180}px` }}>
        <svg className="journey-path" viewBox={`0 0 ${containerWidth} ${journeyStages.length * 240 + 220}`}>
          {pathPoints.slice(0, visiblePoints).map((point, index) => (
            <circle key={`${point.x}-${point.y}-${index}`} cx={point.x} cy={point.y} r="3.2" />
          ))}
        </svg>

        <div className="leaf" style={{ left: `${leafPoint.x}px`, top: `${leafPoint.y}px` }}>
          🍁
        </div>

        {journeyStages.map((stage, index) => {
          const isVisible = stageProgress >= index + 0.9;
          const alignLeft = index % 2 === 0;

          return (
            <article
              key={stage.title}
              className={`journey-stage ${alignLeft ? 'left' : 'right'} ${isVisible ? 'show' : ''}`}
              style={{ top: `${index * 240 + 200}px` }}
            >
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

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

        <PersonalJourney />

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
