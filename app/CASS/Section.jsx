import React from 'react'

const Section = ({text1,text2}) => {
  return (
    <div className='SectionComponent'>
        <p>{text1}</p>
        <p>{text2}</p>
    </div>
  )
}

export default Section