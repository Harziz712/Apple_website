import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import { useRef } from 'react'

const Features = () => {
    // const videoRef = useRef<HTMLVideoElement>(null)
        const videoRef = useRef<HTMLVideoElement | null>(null)
    
    useGSAP(()=>{
        animateWithGsap('#features_title', {

           y: 0, opacity: 1,}, { trigger: '#features_title' })

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
                    </div>

                </div>
            </div>
        </div>

    </section>
  )
}

export default Features