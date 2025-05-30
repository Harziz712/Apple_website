import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../../constants"
import { Button } from "./button"
import { pauseImg, playImg, replayImg } from "../../utils"
import { useGSAP } from "@gsap/react"
import gsap from"gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // <== Import plugin
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef<HTMLVideoElement[]>([])
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([])
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay:false,
        videoId: 0,
        isLastVideo:false,
        isPlaying:false
    })
 
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;
    useGSAP(() => { 
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration:2,
            ease: "power3.inOut",
        })
        gsap.to("#video", {
            scrollTrigger:{
                trigger: "#video",
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setVideo((pre)=> ({
                    ...pre,
                    startPlay:true,
                    isPlaying:true,

                }))
            }
        })  
    }
    , [isEnd, videoId])

    const [loadedData, setLoadedData] = useState<HTMLVideoElement[]>([])

    useEffect(()=> {
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause()
            }
            else{
                startPlay && videoRef.current[videoId].play()
            }
        }

    },[startPlay, videoId,isPlaying, loadedData])

    const handleLoadedMetaData  = (_i: number, e: HTMLVideoElement) => setLoadedData((pre) => [...pre, e])

    // useEffect (()=>{
    //     let currentProgress = 0;
    //     let span = videoSpanRef.current;

    //     if(span[videoId]) {
    //         let anim = gsap.to(span[videoId] ,{
    //             onUpdate: ()=>{
    //                 const progress = Math.ceil(anim.progress() * 100);

    //                 if (progress != currentProgress){
    //                     currentProgress = progress;
    //                     gsap.to(videoDivRef.current[videoId], {
    //                         width: window.innerWidth < 760 ? "10vw" :window.innerWidth < 1200 ? "10vw" : "4vw",
    //                 })

    //                     gsap.to(span[videoId], {
    //                         width: `${currentProgress}%`,
    //                         backgroundColor: "#7a7a7a", 
    //                     })
    //                 }
             
    //             },
    //             onComplete: ()=>{
    //                 if(isPlaying){
    //                     gsap.to(videoDivRef.current[videoId], {
    //                         width: "12px"
    //                     })
    //                     gsap.to(span[videoId], {
    //                 backgroundColor: "#afafa",
    //                 // duration:3
    //             })
    //         }
    //             }
    //         });
    //         if(videoId === 0){
    //             anim.restart()
    //         }
    //         const animUpdate = ()=> {
    //            anim.progress(videoRef.current[videoId]?.currentTime || 0 / 
    //             hightlightsSlides[videoId].videoDuration
    //            ) 
    //         }

    //         if (isPlaying){
    //             gsap.ticker.add(animUpdate) 
    //         }
    //         else{
    //             gsap.ticker.remove(animUpdate)
    //         }
    //     }
    // },[videoId,startPlay])
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        const videoEl = videoRef.current[videoId]; // Get the current video element
    
        if (span[videoId] && videoEl) {
            // Create GSAP animation to track progress
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    // Calculate progress based on the current time and total duration
                    const progress = Math.ceil((videoEl.currentTime / hightlightsSlides[videoId].videoDuration) * 100);
    
                    if (progress !== currentProgress) {
                        currentProgress = progress;
    
                        // Update the width of the progress bar dynamically based on the progress
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw",
                        });
    
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "#7a7a7a", // You can adjust the color as needed
                        });
                    }
                },
                onComplete: () => {
                    // Once the video ends, reset the progress bar
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px"
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafa",
                        });
                    }
                }
            });
    
            if (videoId === 0) {
                anim.restart();
            }
    
            // Update progress based on video currentTime
            const animUpdate = () => {
                anim.progress(videoEl.currentTime / hightlightsSlides[videoId].videoDuration);
            };
    
            // Add GSAP ticker when video is playing
            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay, isPlaying]); // Watch videoId, startPlay, and isPlaying dependencies
    
      

    const handleProcess = (type: string, i: number) => {
        switch (type){
            case "video-end":
                setVideo((pre) => ({
                    ...pre, isEnd: 
                    true, videoId: i + 1
                }))
                break;

            case "video-last":
                setVideo((pre) => ({
                    ...pre, isLastVideo: 
                    true
                }))
                break
    
            case "video-reset":
                setVideo((pre) => ({
                    ...pre, isLastVideo: 
                    false,videoId: 0
                }))
                break;
            case "play":
            setVideo((pre) => ({
                ...pre, isPlaying: 
                !pre.isPlaying
            }))
            break;
            case "pause":
                setVideo((pre) => ({
                    ...pre, isPlaying: 
                    !pre.isPlaying
                }))
                break;
            default:
                return video
        }

    }


  return (
    <>
    <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
            <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                <div className="video-carousel_container">
<div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
    <video 
    id="video"
    playsInline = {true}
    preload="auto"
    muted
    className={`${
        list.id === 2 && "translate-44"
    } pointer-events-none`}
    ref= {(el) => {
        if (el) {
            videoRef.current[i] = el;
        }
    }} 
    onEnded={() => 
    i !== 3 ? 
    handleProcess("video-end", i) 
    : handleProcess("video-last", i)
}

    onPlay = {() => {
    setVideo((prexVideo) => ({
        ...prexVideo, isPlaying: true
    }))
}}

onLoadedMetadata={(e) => handleLoadedMetaData(i, e.currentTarget)}
    > 
        <source src={list.video} type="video/mp4"/>
    </video>
</div>
<div className="absolute top-20 left-[5%] z-10">
    {list.textLists.map((text, _i) => (
        <p key={text} className="md:text-2xl text-xl font-medium">
            {text}
        </p>
    ))}
</div>
              </div>
            </div>
       ) )}
    </div>

    <div className="relative flex justify-center items-center  mt-20 ">
<div className="flex justify-center items-center py-5 px-7 backdrop-blur rounded-full bg-muted-foreground">
    {
    videoRef.current.map((_, i) => (
        <span key={i}
        ref= {(el) => {
            videoDivRef.current[i] = el;
        }}
            className="mx-2 w-3 h-3 bg-secondary rounded-full relative cursor-pointer"
        
        >
            <span className="absolute h-full w-full rounded-full" ref={(el) => { videoSpanRef.current[i] = el; }}></span>
        </span>
    ))
    }
</div>
<Button className="control-btn">
    <img 
        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"} 
        onClick={() => handleProcess(isLastVideo ? "video-reset" : !isPlaying ? "play" : "pause", videoId)} 
    />
</Button>
    </div>
    </>
  )
}

export default VideoCarousel