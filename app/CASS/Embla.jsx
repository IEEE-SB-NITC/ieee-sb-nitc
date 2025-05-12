'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Card from './Card'

export default function EmblaCarousel({data}) {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><Card data={data} /></div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  )
}
// className="headdd" heading={"CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES "} image={" "} venue={"NIT"} date={"24-01-2005"}
