import React from 'react';

const Contact = () => {

  const inputBase = 'mt-1 w-full rounded-lg border focus:outline-none transition';


  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-b from-teal-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight text-teal-800">Contact Us</h2>
            <p className="mt-4 text-teal-700">We’d love to hear from you. Reach out with questions or to schedule a visit.</p>
            <div className="mt-6 space-y-3 text-teal-800">
              <p><span className="font-semibold">Phone:</span> (555) 123-4567</p>
              <p><span className="font-semibold">Email:</span> hello@pawcare.com</p>
              <p><span className="font-semibold">Address:</span> 123 Pet Lane, Happy Town</p>
              <p><span className="font-semibold">Hours:</span> Mon–Sat: 9am–6pm</p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <form className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-teal-800">Full name</label>
                  <input name="name"  type="text"  className={`${inputBase}`} />
                  <p className={`mt-1 text-xs`}></p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-800">Email address</label>
                  <input name="email" type="email" className={`${inputBase}`} />
                  <p className={`mt-1 text-xs `}></p>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-teal-800">Message</label>
                <textarea name="message"  rows="5"  className={`${inputBase} `}></textarea>
                <div className="mt-1 flex items-center justify-between">
                  <p className={`text-xs `}></p>
                  <span className="text-xs text-teal-700"></span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-teal-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-700 ring-1 ring-teal-200">✓</span>
                  We typically respond within 1 business day.
                </div>
                <button type="submit" className="rounded-full px-6 py-3 text-white shadow-md transition bg-teal-600 hover:bg-teal-700 shadow-teal-200">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;



