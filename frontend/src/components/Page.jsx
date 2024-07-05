  import Hero from "./HeroHome";
  import FeaturesPlanet from "./FeatresPlanet";
  import LargeTestimonial from "./LargeTestimonials";
  import  CarouselCustomArrows  from "./CarouselCustomArrows";
  
  export default function Page() {
    return (
      <>
         <Hero />
        <CarouselCustomArrows/>
        <FeaturesPlanet /> 
        <LargeTestimonial />
      </>
    );
  }
  