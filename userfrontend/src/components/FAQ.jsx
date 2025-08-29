import React from 'react';

const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'Click the Book Appointment button and choose your preferred date and time. You can also call us for assistance.',
  },
  {
    q: 'Do you accept emergency walk-ins?',
    a: 'Yes, we accept emergencies during business hours. For after-hours emergencies, please contact your nearest 24/7 clinic.',
  },
  {
    q: 'What pets do you treat?',
    a: 'We primarily treat dogs and cats, but we can refer you to specialists for exotic animals if needed.',
  },
  {
    q: 'What should I bring to my first visit?',
    a: 'Please bring any previous medical records, vaccination history, and a list of medications your pet is taking.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-teal-800">Frequently Asked Questions</h2>
          <p className="mt-3 text-teal-700">Quick answers to common questions.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-teal-100 bg-teal-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-teal-800">{item.q}</h3>
              <p className="mt-2 text-teal-700">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;



