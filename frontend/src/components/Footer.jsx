import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function Footer() {
  return (
    <footer className={`mx-auto max-w-6xl px-4 sm:px-6 mt-12 `}>
      <div
        className="grid gap-10 py-8 sm:grid-cols-12 md:py-12 border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.200),transparent)1]"
      >
        <div className="space-y-2 sm:col-span-12 lg:col-span-4">
          <div>
          </div>
          <div className="text-sm text-gray-600">
            &copy; EduTrack.com - All rights reserved.
          </div>
        </div>

        <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
          <h3 className="text-sm font-medium">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Our method
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
          <h3 className="text-sm font-medium">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Careers
              </Link>
            </li>
 
          </ul>
        </div>

        {/* 4th block */}
        <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
          <h3 className="text-sm font-medium">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Terms of service
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition hover:text-gray-900"
                href="#0"
              >
                Report a vulnerability
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
          <h3 className="text-sm font-medium">Social</h3>
          <ul className="flex gap-1">
            <li>
              <Link
                className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                href="#0"
                aria-label="Twitter"
              >
                <svg
                  className="h-8 w-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z"></path>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                href="#0"
                aria-label="Medium"
              >
                <svg
                  className="h-8 w-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z"></path>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes={
  element:PropTypes.string
}
