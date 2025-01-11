import React, { useEffect } from 'react'
import ImageCarousel from '../../components/Carousel/Carousel'
import SeasonalFaves from '../../components/SeasonalComp/SeasonalDress'
import ShopCategory from '../../components/ShopCategory/ShopCategory' 
 import NavbarComponent from '../../components/Naviagtion/Navigation'
 import '../../App.css'
import { useSelector } from 'react-redux'
import MaintenanceModal from '../../components/MaintainenceModal/maintainenceModal'

function Home() {
  const currentUser = useSelector(state => state.user.currentUser);
  console.log(!currentUser?.role)
  useEffect(()=>{
    window.scrollTo(0, 0); 
  },[])
  return (<>
     {(!currentUser || currentUser.role !== 'admin') && <MaintenanceModal />}
     <NavbarComponent/>
    <ImageCarousel/>
    <ShopCategory/>
    <SeasonalFaves/>
  </>
  )
}

export default Home