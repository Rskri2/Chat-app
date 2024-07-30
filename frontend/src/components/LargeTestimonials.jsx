export default function LargeTestimonial() {
  return (
    <>
    <section>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-black md:text-4xl">
            Author&apos;s Desk
            </h2>
            <div className="relative inline-flex">
              <svg
                className="absolute -left-6 -top-2 -z-10 w-40 h-49"
                viewBox="0 0 40 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
                  fill="#D1D5DB"
                />
              </svg>
              <img
                className="rounded-full w-48 h-48"
                src="src/images/large-testimonial.jpg"

                alt="Large testimonial"
              />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              “At EduTrack, we believe that every organisation deserves a reliable platform to efficiently manage and track employee performance o{" "} . Our mission is to create a transparent and user-friendly environment where both individuals and teams can thrive, ensuring that every employee&apos;s contributions are recognized and optimized..”
            </p>
            <div className="text-sm font-medium text-gray-500">
                Founder-EduTrack
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
