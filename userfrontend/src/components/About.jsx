import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20" style={{ backgroundColor: '#FFD58E' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#54413C' }}>About Us</h2>
            <p className="mt-4" style={{ color: '#333333' }}>
              We’re a compassionate veterinary clinic dedicated to keeping your pets healthy and happy.
              Our experienced team provides personalized care, modern facilities, and a friendly approach
              to every visit.
            </p>
            <ul className="mt-6 space-y-3" style={{ color: '#333333' }}>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full ring-1" style={{ backgroundColor: 'white', color: '#54413C', borderColor: '#FFD58E' }}>
                  ✓
                </span>
                Preventive care and routine wellness
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full ring-1" style={{ backgroundColor: 'white', color: '#54413C', borderColor: '#FFD58E' }}>
                  ✓
                </span>
                Advanced diagnostics and surgery
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full ring-1" style={{ backgroundColor: 'white', color: '#54413C', borderColor: '#FFD58E' }}>
                  ✓
                </span>
                Compassionate, pet-first approach
              </li>
            </ul>
          </div>
          <div>
            <div className="rounded-3xl p-6 shadow-xl ring-1" style={{ backgroundColor: 'white', boxShadow: '0 4px 10px rgba(84, 65, 60, 0.2)', borderColor: '#FFD58E' }}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: '#54413C' }}>Our Mission</h3>
                  <p className="mt-2" style={{ color: '#333333' }}>
                    Deliver gold‑standard veterinary care that’s accessible, stress‑free, and tailored to
                    every pet and their family.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold" style={{ color: '#54413C' }}>Our Values</h3>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="rounded-xl px-4 py-3 ring-1" style={{ backgroundColor: '#FFD58E', color: '#54413C', borderColor: '#54413C' }}>Compassion First</li>
                    <li className="rounded-xl px-4 py-3 ring-1" style={{ backgroundColor: '#FFD58E', color: '#54413C', borderColor: '#54413C' }}>Transparent Care</li>
                    <li className="rounded-xl px-4 py-3 ring-1" style={{ backgroundColor: '#FFD58E', color: '#54413C', borderColor: '#54413C' }}>Modern Medicine</li>
                    <li className="rounded-xl px-4 py-3 ring-1" style={{ backgroundColor: '#FFD58E', color: '#54413C', borderColor: '#54413C' }}>Community Focus</li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl p-4 text-center ring-1" style={{
                    background: 'linear-gradient(to bottom, #FFD58E, white)',
                    borderColor: '#FFD58E'
                  }}>
                    <div className="text-2xl font-bold" style={{ color: '#54413C' }}>5k+</div>
                    <div className="text-sm" style={{ color: '#333333' }}>Pets Cared</div>
                  </div>
                  <div className="rounded-2xl p-4 text-center ring-1" style={{
                    background: 'linear-gradient(to bottom, #FFD58E, white)',
                    borderColor: '#FFD58E'
                  }}>
                    <div className="text-2xl font-bold" style={{ color: '#54413C' }}>98%</div>
                    <div className="text-sm" style={{ color: '#333333' }}>Happy Owners</div>
                  </div>
                  <div className="rounded-2xl p-4 text-center ring-1" style={{
                    background: 'linear-gradient(to bottom, #FFD58E, white)',
                    borderColor: '#FFD58E'
                  }}>
                    <div className="text-2xl font-bold" style={{ color: '#54413C' }}>10+</div>
                    <div className="text-sm" style={{ color: '#333333' }}>Years of Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;