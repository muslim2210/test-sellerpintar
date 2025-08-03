import React from 'react'
import Logo from '../fragments/Logo'

const Footer = () => {
  return (
    <div className='bg-[#2563EB] w-full mx-auto h-[100px] flex gap-3 items-center justify-center'>
      <Logo/>
      <p className='text-white text-xs md:text-base font-normal'>© 2025 Blog genzet. All rights reserved.</p>
    </div>
  )
}

export default Footer
