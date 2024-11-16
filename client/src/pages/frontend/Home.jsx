import React, { useEffect } from 'react'
import ImageCarousel from '../../components/Carousel/Carousel'
import SeasonalFaves from '../../components/SeasonalComp/SeasonalDress'
import ShopCategory from '../../components/ShopCategory/ShopCategory' 
import HomePageModal from '../../modal'
import NavbarComponent from '../../components/Naviagtion/Navigation'
 import '../../App.css'

function Home() {
  useEffect(()=>{
    window.scrollTo(0, 0); 
  },[])
  return (<>
   {/* <HomePageModal/> */}
    <NavbarComponent/>
    <ImageCarousel/>
    <ShopCategory/>
    <SeasonalFaves/>
  </>
  )
}

export default Home