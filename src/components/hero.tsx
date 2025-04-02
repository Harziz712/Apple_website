import gsap from"gsap";
import {useGSAP} from '@gsap/react'
import {heroVideo, smallHeroVideo} from '../utils'
import { useEffect, useState } from "react";


const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ?  smallHeroVideo: heroVideo  )  
    
    const handleVideoSrcSet = () => { 
        setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
    }
   useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet)
    return () => {
        window.removeEventListener('resize', handleVideoSrcSet)
    }
   }, [])

    useGSAP(() => {
        gsap.to('#hero', { opacity: 1, delay:1.5,  duration: 2})  
    }
    , [])
  return (
    <section className="w-full nav-height bg-black relative ">
        <div className="h-5/6 w-full justify-center items-center flex flex-col">
        
        <p id="hero" className="hero-title">iPhone 15 Pro</p>

<div className="md:w-10/12 w-9/12" >
<video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc} loop={true} > 
    <source src={videoSrc} type="video/mp4" />
</video>
</div>
        </div>

    </section>
  )
}

export default Hero