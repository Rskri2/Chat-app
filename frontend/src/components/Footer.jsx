import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function Footer() {
  return (
    <footer className={`mx-auto max-w-6xl px-4 sm:px-6 mt-100`}>
      <div
        className="grid gap-10 py-8 sm:grid-cols-12 md:py-12 border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.200),transparent)1]"
      >
        <div className="space-y-2 sm:col-span-12 lg:col-span-4">
          <div>
          </div>
          <div className="text-sm text-gray-600">
            &copy;  ChatApp.com - All rights reserved.
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
      </div>
    </footer>
  )
}

Footer.propTypes={
  element:PropTypes.string
}
