'use client'

import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">INKINGI</h3>
            <p className="text-gray-300">
              Supporting hidden talent and nurturing the future through creative initiatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-primary transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-primary transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <FiMail />
                <a href="mailto:niyodidie@gmail.com" className="hover:text-primary transition">
                  niyodidie@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiPhone />
                <a href="tel:+250792505680" className="hover:text-primary transition">
                  +250 792 505 680
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © 2024 INKINGI CREATIVE HUB. All rights reserved. | Support Hidden Talent. Support the Future.
          </p>
        </div>
      </div>
    </footer>
  )
}
