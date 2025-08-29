import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-sm text-yellow-700 ring-1 ring-yellow-100">
              <span>Trusted Veterinary Care</span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-800">
              Caring for your pets with love and expertise
            </h1>
            <p className="mt-4 max-w-xl text-teal-700">
              Book appointments, explore services, and keep your furry friends happy and healthy with our dedicated veterinary team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#book" className="rounded-full bg-teal-600 px-6 py-3 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 transition">Book Appointment</a>
              <a href="#services" className="rounded-full bg-white px-6 py-3 text-teal-700 ring-1 ring-teal-200 hover:bg-teal-50 transition">Explore Services</a>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto w-full max-w-xl">
              <div className="aspect-[4/3] rounded-3xl bg-white p-2 shadow-xl shadow-teal-200 ring-1 ring-teal-100">
                <div className="grid h-full w-full grid-cols-3 gap-2">
                  <div className="col-span-2 rounded-2xl bg-[url('https://images.pexels.com/photos/32054246/pexels-photo-32054246.jpeg')] bg-cover bg-center" />
                  <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                  <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                  <div className="col-span-2 rounded-2xl bg-[url('https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


