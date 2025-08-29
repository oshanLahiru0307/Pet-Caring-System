import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-teal-800">About Us</h2>
            <p className="mt-4 text-teal-700">
              We’re a compassionate veterinary clinic dedicated to keeping your pets healthy and happy.
              Our experienced team provides personalized care, modern facilities, and a friendly approach
              to every visit.
            </p>
            <ul className="mt-6 space-y-3 text-teal-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 ring-1 ring-teal-200">✓</span>
                Preventive care and routine wellness
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 ring-1 ring-teal-200">✓</span>
                Advanced diagnostics and surgery
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 ring-1 ring-teal-200">✓</span>
                Compassionate, pet-first approach
              </li>
            </ul>
          </div>
          <div>
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-teal-200 ring-1 ring-teal-100">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-teal-800">Our Mission</h3>
                  <p className="mt-2 text-teal-700">
                    Deliver gold‑standard veterinary care that’s accessible, stress‑free, and tailored to
                    every pet and their family.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-teal-800">Our Values</h3>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="rounded-xl bg-teal-50 px-4 py-3 ring-1 ring-teal-100 text-teal-800">Compassion First</li>
                    <li className="rounded-xl bg-teal-50 px-4 py-3 ring-1 ring-teal-100 text-teal-800">Transparent Care</li>
                    <li className="rounded-xl bg-teal-50 px-4 py-3 ring-1 ring-teal-100 text-teal-800">Modern Medicine</li>
                    <li className="rounded-xl bg-teal-50 px-4 py-3 ring-1 ring-teal-100 text-teal-800">Community Focus</li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-gradient-to-b from-teal-50 to-white p-4 text-center ring-1 ring-teal-100">
                    <div className="text-2xl font-bold text-teal-800">5k+</div>
                    <div className="text-sm text-teal-700">Pets Cared</div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-b from-teal-50 to-white p-4 text-center ring-1 ring-teal-100">
                    <div className="text-2xl font-bold text-teal-800">98%</div>
                    <div className="text-sm text-teal-700">Happy Owners</div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-b from-teal-50 to-white p-4 text-center ring-1 ring-teal-100">
                    <div className="text-2xl font-bold text-teal-800">10+</div>
                    <div className="text-sm text-teal-700">Years of Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;



