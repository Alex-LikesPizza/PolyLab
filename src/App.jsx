import React from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import Home from './components/pages/home/Home.jsx';
import Learn from './components/pages/learn/Learn.jsx'
import About from './components/pages/about/About.jsx';
import SignIn from './components/pages/sign-in/SignIn.jsx';
function App() {

  return (
    <div className='app'>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/learn" element={<Learn />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/about" element={<About />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App