import React from 'react'
// import Banner from './Components/Banner'
// import ImageCarousel from './Components/ImageCarousel'
// import CardSection from './Components/CardSection'
import HowItWorks from './Components/HowItWorks'
// import OurBenefits from './Components/OurBenefits'
// import Testimonials from './Components/Testimonials'
// import BoostSales from './Components/BoostSales'
// import Brands from './Components/Brands'
// import Worldmap from './Components/Worldmap'
// import ReadyToTake from './Components/ReadyToTake'
// import InstantlyPreview from './Components/InstantlyPreview'
// import PlansList from '../Dashboard/PlansList'
// import Faqs from './Components/Faqs'
import HeroBanner from './Components/HeroBanner'
import WrapPreviewSection from './Components/WrapPreviewSection'
import VisualizeEasySection from './Components/VisualizeEasySection'
import HeroBrands from './Components/HeroBrands'
import TrendingColors from './Components/TrendingColors'
import Explorewrapbrands from './Components/Explorewrapbrands'
import ColorVisualizer from '../../Components/Home/ColorVisualizer'

const Home = () => {
  return (
    <>
      <HeroBanner />
      {/* <CardSection /> */}
      {/* <HowItWorks /> */}
      <WrapPreviewSection />
      <VisualizeEasySection />
      <HeroBrands />
      <TrendingColors />
      <Explorewrapbrands />
      <ColorVisualizer 
      title={"READY TO SEE YOUR CAR IN A WHOLE NEW COLOR?"}
      desc={"Pick your vehicle and start exploring hundreds of wraps — instantly. "}
      app={true}
      />
      {/* <Brands />
      <InstantlyPreview />
      <OurBenefits />
      <Worldmap />
      <ReadyToTake /> */}
      {/* <div className='max-w-7xl my-11 mx-auto'>
        <p className='text-white text-center mb-3.5 font-Inter  capitalize'>Cancel at anytime </p>
        <h2 className='text-4xl font-Inter font-bold mb-7 text-white text-center'>Our Subscriptions</h2>
        <PlansList location="home" />
      </div> */}
      {/* <Testimonials /> */}
      {/* <BoostSales />
      <Faqs /> */}
    </>
  )
}

export default Home
