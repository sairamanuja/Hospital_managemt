import React from 'react'
import {Navbar} from '../Components/Layout/home/Navbar'
import {Content_1} from '../Components/Layout/home/Content_1'
import {Doctor_component} from '../Components/Layout/home/Doctor_component'
import {Footer} from '../Components/Layout/home/Doctor_component'
import {Content_2} from '../Components/Layout/home/Doctor_component'
const HomePage = () => {
  return (
    <>
     <div className="w-[80%] m-auto h-screen">
    <Navbar/>
    <Content_1/>
    <Doctor_component/>
    <Content_2/>
    <Footer/>
   
    </div>
    </>
  )
}

export default HomePage