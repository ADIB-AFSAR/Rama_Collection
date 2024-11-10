import React from 'react'
import ImageCarousel from '../../components/Carousel/Carousel'
import TshrtTrouserComp from '../../components/T&trouser/T&t'
import SeasonalFaves from '../../components/SeasonalComp/SeasonalDress'
import ShopCategory from '../../components/ShopCategory/ShopCategory' 
import HomePageModal from '../../modal'
import NavbarComponent from '../../components/Naviagtion/Navigation'
 import '../../App.css'

function Home() {
  return (<>
   {/* <HomePageModal/> */}
    <NavbarComponent/>
    <ImageCarousel/>
    <TshrtTrouserComp/>
    <SeasonalFaves/>
    <ShopCategory/>
  </>
  )
}

export default Home