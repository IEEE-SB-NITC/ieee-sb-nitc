'use client'

import Image from 'next/image'; // only use this if you're using Next.js
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Card from './Card'

export default function EmblaCarousel({data}) {
  const [emblaRef, emblaApi] = useEmblaCarousel()

const scrollPrev = useCallback(() => {
  if (emblaApi) emblaApi.scrollPrev()
}, [emblaApi])

const scrollNext = useCallback(() => {
  if (emblaApi) emblaApi.scrollNext()
}, [emblaApi])
  
  return (
    <div className="emblaDad">
    <div className="embla" >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {
            data.map((d,index)=>(
              <div className="embla__slide" key={index}><Card image={d.imageSrc} heading={d.heading} venue={d.venue} date={d.date}/></div>
            ))
          }
        </div>
      </div>
      <div className="embla__button">
        <button className="embla__prev" onClick={scrollPrev}>
          {/* Prev */}
          <Image className='leftArrow' src="/assets/VectorArrow.png"   width={24} height={24} alt=' ' />
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <Image className='rightArrow' src="/assets/VectorArrow.png"   width={24} height={24} alt=' ' />
          {/* Next */}
        </button>
      </div>
      
    </div>
    </div>
  )
}
// className="headdd" heading={"CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES "} image={" "} venue={"NIT"} date={"24-01-2005"}
