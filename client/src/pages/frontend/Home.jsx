import React, { useEffect } from 'react'
import ImageCarousel from '../../components/Carousel/Carousel'
import SeasonalFaves from '../../components/SeasonalComp/SeasonalDress'
import ShopCategory from '../../components/ShopCategory/ShopCategory' 
 import NavbarComponent from '../../components/Naviagtion/Navigation'
 import '../../App.css'
import { useSelector } from 'react-redux'
import MaintenanceModal from '../../components/MaintainenceModal/maintainenceModal'
import { useNavigate } from 'react-router-dom'


function Home() {
 
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate()
   useEffect(() => {
  const thankYouFlag = localStorage.getItem("showThankYou");
  if (thankYouFlag === "1") {
    navigate("/thankyou");
  }
}, []);

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