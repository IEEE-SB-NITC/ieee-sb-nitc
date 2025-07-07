import React from 'react'

const Section = ({text1,text2,className}) => {
  return (
    <div className='SectionComponent'>
        {/* <div className="back">
        </div> */}
        <div className="front">
          <div className='fleex-col'>
          {/* <p className='dots'>..........................</p> */}
          <p className='text1' >{text1}</p>
          {/* <p  className='dots'>.............................</p> */}
          </div>
          <div className="text2cont">
            <p className={`dots ${className || ''}`}>{text2}</p>
          </div>
        </div>
    </div>
  )
}


export default Section