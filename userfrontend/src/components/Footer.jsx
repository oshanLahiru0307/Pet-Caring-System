import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-teal-900 text-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M5 8.5C5 7.12 6.12 6 7.5 6S10 7.12 10 8.5 8.88 11 7.5 11 5 9.88 5 8.5zm4.5 5C9.5 12.12 10.62 11 12 11s2.5 1.12 2.5 2.5S13.38 16 12 16 9.5 14.88 9.5 13.5zM14 8.5C14 7.12 15.12 6 16.5 6S19 7.12 19 8.5 17.88 11 16.5 11 14 9.88 14 8.5z" />
                  <path d="M16.75 13.75a.75.75 0 0 1 1.5 0 3.25 3.25 0 0 1-3.25 3.25H14a3.75 3.75 0 0 1-3.75-3.75V9.5a.75.75 0 0 1 1.5 0v3.75A2.25 2.25 0 0 0 14 15.5h1c.689 0 1.25-.561 1.25-1.25z" />
                </svg>
              </span>
              <span className="text-lg font-semibold">PawCare</span>
            </div>
            <p className="mt-4 text-teal-100/90">Modern veterinary care with a gentle touch.</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-teal-100">Quick Links</div>
            <ul className="mt-3 space-y-2 text-teal-100/90">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-teal-100">Contact</div>
            <ul className="mt-3 space-y-2 text-teal-100/90">
              <li>123 Paw Street, Pet City</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@pawcare.com</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-teal-100">Follow Us</div>
            <div className="mt-3 flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 hover:bg-teal-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M13.5 8.25H15V6h-1.5A3.75 3.75 0 0 0 9.75 9.75V12H8.25v2.25h1.5V21h2.25v-6.75h1.5L14.25 12H12V9.75c0-.828.672-1.5 1.5-1.5z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 hover:bg-teal-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M21 6.5a7.9 7.9 0 0 1-2.357.683 4.12 4.12 0 0 0 1.806-2.27 7.97 7.97 0 0 1-2.605.996A4.01 4.01 0 0 0 12.5 9.5c0 .314.036.62.106.912A11.36 11.36 0 0 1 4.5 6.19a4.01 4.01 0 0 0 1.24 5.35 3.95 3.95 0 0 1-1.82-.5v.05A4.02 4.02 0 0 0 7.99 15a4.05 4.05 0 0 1-1.81.068 4.03 4.03 0 0 0 3.76 2.77A8.05 8.05 0 0 1 3 19.5a11.35 11.35 0 0 0 6.15 1.8c7.38 0 11.42-6.24 11.42-11.65 0-.177-.004-.354-.012-.53A8.3 8.3 0 0 0 21 6.5z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 hover:bg-teal-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M7 3.75h10A3.25 3.25 0 0 1 20.25 7v10A3.25 3.25 0 0 1 17 20.25H7A3.25 3.25 0 0 1 3.75 17V7A3.25 3.25 0 0 1 7 3.75zm5 3a5.25 5.25 0 1 0 0 10.5A5.25 5.25 0 0 0 12 6.75zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm5.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-teal-800 pt-6 text-sm text-teal-100/80">
          © {new Date().getFullYear()} PawCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;



