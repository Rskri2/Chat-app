import {Link} from 'react-router-dom';
export default function HeroHome() {
  return (
    <div>
         <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
             Chat app<br className="max-lg:hidden" />
              
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Sign up today to take control chat with others
              </p>
                      <div className="inline-block shrink-0 rounded-md border border-black bg-black px-12 pb-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 h-16">
                  <div className="mt-4 text-sm text-gray-500 sm:mt-0 text-center pt-6 ">
                  
                    <Link to="/register" className="text-gray-700 underline">
                     Register
                    </Link>
                  </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
