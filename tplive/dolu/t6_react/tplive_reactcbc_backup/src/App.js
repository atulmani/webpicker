import '../src/css/App.css';
import React, { Component, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from "react-router-dom";

import BeforeNavbar from './components/BeforeNavbar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import BottomBar from './components/BottomBar';
import HomePage from './components/HomePage';
import HPGenere from './components/HPGenere';
import HPGrowWithUs from './components/HPGrowWithUs';
import HPGameSection from './components/HPGameSection';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';
import Location from './components/Location';
import More from './components/More';
import EventDetails from './components/EventDetails';
import Login from './components/Login'
import PrivacyPolicy from './components/PrivacyPolicy'
import HPLastSection from './components/HPLastSection';
import UserProfile from './components/UserProfile';
import PhoneSignUp from './components/PhoneSignUp';
import RegistrationCategory from './components/RegistrationCategory';
import RegistrationCheckout from './components/RegistrationCheckout';
import { UserAuthContextProvider } from './context/UserAuthcontext';
import PaymentGateway from './components/PaymentGateway';
import EventParticipation from './components/EventParticipation';

// import PaymentGatewayPayTm from './components/PaymentGatewayPayTm';

import PaymentSuccessful from './components/PaymentSuccessful';
import PaymentFailed from './components/PaymentFailed';
import EventEntries from './components/EventEntries';
import EventPartcipants from './components/EventPartcipants';
import PlayerParticipation from './components/PlayerParticipation';
import TermsAndConditions from './components/TermsAndConditions';
import ContactUs from './components/ContactUs';
import RefundAndCancellation from './components/RefundAndCancellation';
import AboutUs from './components/AboutUs';

import ProtectedRoute from './components/ProtectedRoute';
import EventRegistration from './components/EventRegistration';
import RegisteredProfile from './components/RegisteredProfile';
import EventCategoryPartcipants from './components/EventCategoryPartcipants';
import ExportExcelComp from './components/ExportExcelComp';
import MyExcelComponant from './components/MyExcelComponant';
import FAQ from './components/FAQ';
import ExportEventEntry from './components/ExportEventEntry';
// import { render } from '@testing-library/react';

// 1.constructor
// 2.render
// 2.componentDidMount


function App() {
  const [showFlag, setShowFlag] = useState(true);

  const [city, setCity] = useState();
  // let location = useLocation();
  let location = useLocation();
  console.log(location.pathname);

  function setMyCity(selCity) {
    setCity(selCity);
  }
  useEffect(() => {
    // console.log(window.location.pathname);
    if (window.location.pathname === '/PhoneSignUp' || window.location.pathname === '/UserProfile') {
      setShowFlag(false);
    }
    setCity(window.localStorage.getItem('userLocation') ? window.localStorage.getItem('userLocation') : 'All');

  }, [])

  return (
    <>


      {/* <Router> */}
      <BeforeNavbar city={city} />

      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/More' element={<Navbar isFlag={'more'} />} />
          <Route exact path='/Event' element={<Navbar isFlag={'event'} />} />
          <Route exact path='/ContactUs' element={<Navbar isFlag={'contactus'} />} />
          <Route exact path='/' element={<Navbar isFlag={'home'} />} />
          <Route path='*' element={<Navbar isFlag={'all'} />} />
        </Routes>
        <Routes>
          <Route path='*' element={<NavbarMobile City={city}></NavbarMobile>} />
        </Routes>
        <BottomBar></BottomBar>
        <Routes>
          <Route exact path='/More' element={<More />} />
          <Route exact path='/Location' element={<Location City="All" setCity={setMyCity} />} />
          <Route exact path='/Event' element={<HomePage />} />


          <Route exact path='/EventDetails' element={<EventDetails />} />
          <Route exact path='/EventParticipation' element={<EventParticipation />} />


          <Route exact path='/Login' element={<Login />} />

          <Route exact path='/EventRegistration' element={<EventRegistration />} />
          <Route exact path='/PhoneSignUp' element={<PhoneSignUp />} />
          <Route exact path='/UserProfile' element={<UserProfile />} />
          {/* <Route exact path='/RegisteredProfile' element={<ProtectedRoute> <RegisteredProfile /> </ProtectedRoute>} /> */}
          <Route exact path='/RegisteredProfile' element={<RegisteredProfile />} />
          <Route exact path='/RegistrationCategory' element={<RegistrationCategory />} />
          <Route exact path='/RegistrationCheckout' element={<RegistrationCheckout />} />
          <Route exact path='/PaymentGateway' element={<PaymentGateway />} />

          {/* <Route exact path='/PaymentGatewayPayTm' element={<PaymentGatewayPayTm />} /> */}

          <Route exact path='/PaymentSuccessful' element={<PaymentSuccessful />} />
          <Route exact path='/PaymentFailed' element={<PaymentFailed />} />
          <Route exact path='/EventEntries' element={<EventEntries />} />
          <Route exact path='/EventPartcipants' element={<EventPartcipants />} />
          <Route exact path='/PlayerParticipation' element={<PlayerParticipation></PlayerParticipation>}></Route>
          <Route exact path='/EventCategoryPartcipants' element={<EventCategoryPartcipants></EventCategoryPartcipants>}></Route>
          <Route exact path='/TermsAndConditions' element={<TermsAndConditions></TermsAndConditions>}></Route>
          <Route exact path='/PrivacyPolicy' element={<PrivacyPolicy></PrivacyPolicy>}></Route>
          <Route exact path='/ContactUs' element={<ContactUs></ContactUs>}></Route>
          <Route exact path='/RefundAndCancellation' element={<RefundAndCancellation></RefundAndCancellation>}></Route>
          <Route exact path='/AboutUs' element={<AboutUs></AboutUs>}></Route>
          <Route exact path='/FAQ' element={<FAQ></FAQ>}></Route>
          <Route exact path='/ExportExcelComp' element={<ExportExcelComp></ExportExcelComp>}></Route>
          <Route exact path="/MyExcelComponant" element={<MyExcelComponant></MyExcelComponant>}></Route>
          <Route exact path='/ExportEventEntry' element={<ExportEventEntry ></ExportEventEntry>}></Route>

          <Route path='/' element={<HomePage />} />
        </Routes>

        <HPGenere></HPGenere>
        <section>
          <HPGrowWithUs></HPGrowWithUs>
        </section>
        <HPGameSection></HPGameSection>

        <PartnerSection></PartnerSection>
        <Footer />
      </UserAuthContextProvider>
      {/* </Router> */}
    </>
  );
}
export default App;
