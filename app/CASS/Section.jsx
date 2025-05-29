import React from 'react'

const Section = ({text1,text2}) => {
  return (
    <div className='SectionComponent'>
        <div className="back">
        </div>
        <div className="front">
          <div className='fleex-col'>
          {/* <p className='dots'>..........................</p> */}
          <p className='text1' >{text1}</p>
          {/* <p  className='dots'>.............................</p> */}
          </div>
          <p>{text2}</p>
        </div>
    </div>
  )
}

export default Section