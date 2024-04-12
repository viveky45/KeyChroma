import React from 'react'
import logo from "../assets/logo.png"
import github from "../assets/github.svg"
const Navbar = () => {
  return (
    <nav className=" flex items-center justify-around h-16">
        <div className="logo cursor-pointer flex items-center gap-1 "><img className="h-12 w-12"  src={logo} alt="" /><span className="cmpname text-xl sm:text-2xl font-extrabold  text-[#ebb70e] " >Key</span><span className='cmpname text-xl sm:text-2xl font-extrabold  text-[#eb0e0edd]'>Chroma</span></div>
        <ul className='flex gap-1 sm:gap-4 items-center'>
            <li className='navbtnw flex gap-4 sm:gap-10 font-semibold text-[#ebb70e]'>
                <a className='navbtn' href="">Home</a>
                <a className='navbtn' href="">About</a>
            </li>
            <li>
               <a className='' href="https://github.com/Rituraj67" target='_blank'><img className='invert' src={github} alt="github" /></a> 
            </li>
        </ul>
    </nav> 
  )
}

export default Navbar
