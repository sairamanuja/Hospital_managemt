import React from 'react'
import { MainLayout} from "../../Components/Layouts/MainLayout"
import { DoctorList } from '../../Components/HomePage/DoctorList'
import { Section_1 } from '../../Components/HomePage/Section_1'
import { Section_2 } from '../../Components/HomePage/Section_2'

const Home = () => {
  return (
    <div>
      <MainLayout>
      <Section_1/>
    <DoctorList/>
    <Section_2/>
    
    
      </MainLayout>
    </div>
  )
}

export default Home
