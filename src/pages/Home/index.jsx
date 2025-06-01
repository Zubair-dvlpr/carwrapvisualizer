import React from 'react'
import Banner from './Components/Banner'
import ImageCarousel from './Components/ImageCarousel'
import CardSection from './Components/CardSection'
import HowItWorks from './Components/HowItWorks'
import OurBenefits from './Components/OurBenefits'
import Testimonials from './Components/Testimonials'
import BoostSales from './Components/BoostSales'
import Brands from './Components/Brands'
import Worldmap from './Components/Worldmap'
import ReadyToTake from './Components/ReadyToTake'
import InstantlyPreview from './Components/InstantlyPreview'
import PlansList from '../Dashboard/PlansList'
import Faqs from './Components/Faqs'

const Home = () => {
  return (
    <>
      <Banner />
      {/* <CardSection /> */}
      <HowItWorks />
      <Brands />
      <InstantlyPreview />
      <OurBenefits />
      <Worldmap />
      <ReadyToTake />
      {/* <div className='max-w-7xl my-11 mx-auto'>
        <p className='text-white text-center mb-3.5 font-Inter  capitalize'>Cancel at anytime </p>
        <h2 className='text-4xl font-Inter font-bold mb-7 text-white text-center'>Our Subscriptions</h2>
        <PlansList location="home" />
      </div> */}
      {/* <Testimonials /> */}
      <BoostSales />
      <Faqs />
    </>
  )
}

export default Home
