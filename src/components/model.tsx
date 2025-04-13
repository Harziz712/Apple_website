import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ModelView from "./ui/modelview"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { yellowImg } from "../utils"
import { Canvas} from "@react-three/fiber"
import { View} from "@react-three/drei"
import { models, sizes } from "../constants"
import ErrorBoundary from "./ui/ErrorBoundary"
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { animateWithGsapTimeline } from "../utils/animations"




const Model = () => {
    const [size, setSize] = useState<string>('small');
    const[model, setModel] = useState<{
        title: string;
        color: string[]
        img: string;
    }>({
        title:'iphone 15 Pro in Natural Titanium',
        color:["#8F8A81", "#FFE7B9", "#6F6C64", "#C7C2B5"],
        img: yellowImg,
    })

    // Camera control for the model view
    const cameraControlSmall = useRef<OrbitControlsImpl | null>(null);
    const cameraControlLarge = useRef<OrbitControlsImpl | null>(null);
    
    

    // Model references for the model view
    const small = useRef<THREE.Group>(new THREE.Group());
    const large = useRef<THREE.Group>(new THREE.Group());

    // rotation state for the model view
    const [smallRotation, setSmallRotation] = useState(0)
    const [largeRotation, setLargeRotation] = useState(0)

const tl = gsap.timeline();

useEffect(()=> {
    if (size === 'large'){
        animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
            transform: 'translateX(-100%)',
            duration:2
        })
    }
    if (size === 'small'){
        animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
            transform: 'translateX(0)',
            duration:2
        })
    }
},[size, smallRotation, largeRotation])


    useGSAP(()=> {
        gsap.to("#heading", {
            y:0,
            opacity: 1, 
        })
    } , [])
  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">Take a closer look</h1>
            <div className="flex flex-col items-center mt-5 justify-center">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView
                    index={1}
                    groupRef={small}
                    gsapType='view1'
                    controlRef={cameraControlSmall}
                    setRotationState={setSmallRotation}
                    item = {model}
                    size={size}

                    />

                    <ModelView
                    index={2}
                    groupRef={large}
                    gsapType='view2'
                    controlRef={cameraControlLarge}
                    setRotationState={setLargeRotation}
                    item = {model}
                    size={size}

                    />
                    <ErrorBoundary>
                    <Canvas
                    className="w-full h-full"
                    style={{
                        position: "fixed",
                        top: 0,
                        bottom:0,
                        right: 0,
                        left: 0,
                        // pointerEvents: "none",
                        overflow: "hidden",
                        }}
                        
                        eventSource={document.getElementById("root") || undefined}>
                        <View.Port/>
                        
                    </Canvas>
                    </ErrorBoundary>
                </div>
                <div className="mx-auto w-full"><p className="text-sm font-light text-center mb-5" >{model.title}</p>
                <div className="flex-center"><ul className="color-container">
                    {models.map((item, i) => (
                        <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{backgroundColor:item.color[0]} } onClick={()=> setModel(item)}></li>
                    ))}</ul>
                    <button className="size-btn-container">
                    {sizes.map(({label, value})=> (
                    <span key={label} className="size-btn" style={{
                    
                    backgroundColor:size === value ? 'white' : 'transparent',
                    color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                    {label}</span>))}</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default Model