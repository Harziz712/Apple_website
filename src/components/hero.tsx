import gsap from"gsap";
import {useGSAP} from '@gsap/react'


const Hero = () => {
    useGSAP(() => {
        gsap.fromTo('.hero-title', {y: -100, opacity: 0}, {y: 0, opacity: 1, duration: 2})  
    }
    , [])
  return (
    <section className="w-full nav-height bg-black relative">
        <div className="h-5/6">
        
        <p className="hero-title">iPhone 15 Pro</p>

        </div>
    </section>
  )
}

export default Hero