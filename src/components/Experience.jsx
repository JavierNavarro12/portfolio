import React, { useRef, useLayoutEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from '../hooks/useGSAP';

function Experience() {
  const { t } = useLanguage();
  const { experience } = t;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('h2, .experience-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" ref={sectionRef} className="w-full mb-16 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight text-center">
        {experience.title}
      </h2>
      <div className="experience-item max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {experience.role} · {experience.company}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{experience.period}</span>
        </div>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          {experience.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900 dark:bg-white" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <p className="experience-item text-center text-gray-600 dark:text-gray-400 mt-6">{experience.education}</p>
    </section>
  );
}

export default Experience;
