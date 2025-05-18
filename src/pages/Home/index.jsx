import React from 'react'
import Banner from './Components/Banner'
import ImageCarousel from './Components/ImageCarousel'
import CardSection from './Components/CardSection'
import HowItWorks from './Components/HowItWorks'
import OurBenefits from './Components/OurBenefits'
import Testimonials from './Components/Testimonials'
import BoostSales from './Components/BoostSales'

const Home = () => {
  return (
   <>
    <Banner />   
    <CardSection />
    <HowItWorks />
    <OurBenefits />
    <Testimonials />
    <BoostSales />
   </>
  )
}

export default Home
