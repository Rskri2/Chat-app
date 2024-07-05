// import PageIllustration from "./PageIllustration";
import {Link} from 'react-router-dom';
export default function HeroHome() {
  return (
    <div>
         <section className="relative">
      {/* <PageIllustration /> */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              {/* <div className="-mx-0.5 flex justify-center -space-x-3">
                <img
                  className="box-content rounded-full border-2 border-gray-50 w-32 h-32"
                  src="tailwind-landing-page-template/public/images/avatar-01.jpg"
                  alt="Avatar 01"
                />
                <img
                  className="box-content rounded-full border-2 border-gray-50 w-32 h-32"
                  src="tailwind-landing-page-template/public/images/avatar-02.jpg"
                  alt="Avatar 01"
                />
                <img
                  className="box-content rounded-full border-2 border-gray-50 w-32 h-32"
                  src="tailwind-landing-page-template/public/images/avatar-03.jpg"
                  alt="Avatar 02"
                />
                <img
                  className="box-content rounded-full border-2 border-gray-50 w-32 h-32"
                  src="tailwind-landing-page-template/public/images/avatar-04.jpg"
                  alt="Avatar 03"
                />
                <img
                  className="box-content rounded-full border-2 border-gray-50 w-32 h-32"
                  src="tailwind-landing-page-template/public/images/avatar-05.jpg"
                  alt="Avatar 04"
                />
                <img
                  className="box-content rounded-full border-2 border-gray-50 w-32 h-32"
                  src="tailwind-landing-page-template/public/images/avatar-06.jpg"
                  alt="Avatar 05"
                />
              </div> */}
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Tracking portal for the students <br className="max-lg:hidden" />
              
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Sign up today to take control of your learning experience, enhance
                your teaching methods, or manage your educational organization.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                     <button >
                     <Link to="/register" className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 w-full"
                     >
                    Sign up today
                  </Link>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
