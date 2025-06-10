import React from 'react'
import Image from "next/image";


const Header = () => {
  return (
    <div className="Header">
      <div className="main">
            <div >
                <Image className="logo" src="/assets/logo.png" alt="Logo" width={100} height={70} />
                {/* <img className="logo" src={logo} alt="" /> */}
            </div>
            <div className="items">
                <button className='header-button'>Home</button>
                <button className='header-button'>Chapters</button>
                <button className='header-button'>Execom</button>
                <button className='header-button'>Gallery</button>
                <button className='header-button'>Contact Us</button>
                <button className='header-button'>Blogs</button>
                <button className='header-button'>Join IEEE</button>
            </div>
        </div>
        <div>Chapters</div>
        <div className="sub"> 
            <p>Circuit And Systems Society</p>
            <p className="cass">(CASS)</p>
        </div>
    </div>
  )
}

export default Header