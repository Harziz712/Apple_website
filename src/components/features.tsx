import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import { useRef } from 'react'

const Features = () => {
    // const videoRef = useRef<HTMLVideoElement>(null)
        const videoRef = useRef<HTMLVideoElement | null>(null)
    
    useGSAP(()=>{
        gsap.to( '#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: ' -10% bottom',
            },
            onComplete: () => {
                if (videoRef.current) {
                    videoRef.current.play() 
                }
            }
        })
        animateWithGsap('#features_title', {

            y: 0, opacity: 1,}, { trigger: '#features_title' }) 
        animateWithGsap('.g_grow', {

        scale: 1, opacity: 1, ease:'power1',}, { scrub: 5.5},)
        animateWithGsap('.g_text', {y:0, opacity:1, ease: 'power1', duration:1}, { trigger: '.g_text' })

    },[])
  return (
    <section className='h-full common-padding bg-background relative overflow-hidden'>
        <div className='screen-max-width'>
            <div className="mb-12 w-full">
                <h1 id="features_title" className='section-heading'>
                    Explore the full story.
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center overflow-hidden">
                <div className="mt-32 mb-24 pt-24">
                    <h2 className="text-5xl lg:text-7xl font-semibold">iPhone</h2>
                    <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium</h2>
                </div>
                <div className='flex-center flex-col sm:px-10'>
                    <div className="w-full h-[50vh] relative flex items-center">
<video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' ref={videoRef} muted loop autoPlay controls={false}>
    <source src={exploreVideo} type='video/mp4'/>
</video>
                    </div>
                    <div className="flex flex-col w-full relativ">
                        <div className="feature-video-container">
                        <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore1Img} alt="titanium" className='feature-video g_grow' />
                            </div>        
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore2Img} alt="titanium 2" className='feature-video g_grow' />
                            </div>
                        </div>
                        <div className="feature-text-co">
                            <div className="flex-1 flex-center">
                                <p className="feature-text g_text">
                                    iphone 15 Pro is {' '} 
                                    <span className='text-white'>
                                        the first iphone to feature an aerospace-grade titanium,
                                </span> {' '}
                                using the same alloy that spacecraft use for missions to Mars.
                                </p>
                            </div>
                            <div className="flex-1 flex-center">
                                <p className="feature-text g_text">
                                   Titanium has one of the best strength-to-weight ratios of any metal, amking these our {' '} 
                                    <span className='text-white'>
                                    Lightest Pro models ever.                               
                                </span> {' '}
                                You'll notice the diffrence the moment you pick one up.                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>
  )
}

export default Features