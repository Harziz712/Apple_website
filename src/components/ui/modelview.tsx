import * as THREE from "three"
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "../lights";
import { Suspense} from "react";
import IPhone from "../IPhone";
import React from "react";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Loader from "../loader";


 export type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<OrbitControlsImpl | null>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: {
      title: string;
      color: string[];
      img: string;
  };
  size: string;
  scale: [number, number, number];
};

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: ModelViewProps) => {

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full ${index === 2 ? 'right-[-100%]' : ''}`}

    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3}/>

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0 , 0, 4]}/>
<Lights/>
<OrbitControls 
makeDefault
ref={controlRef}
enableZoom={false}
enablePan={false}
rotateSpeed={0.4}
target ={new THREE.Vector3(0,0,0)}
onEnd={() => {
  if (controlRef.current) {
    setRotationState(controlRef.current.getAzimuthalAngle());
  }  
}}
/>
<group ref={groupRef} position={[0, 0, 0]} name={index === 1 ? "small" : "large"}>
  <meshStandardMaterial color={item.color[0]} />
  <Suspense fallback={<Loader />}>
    <IPhone 
    scale={index === 1 ? [15, 15 , 15] : [17, 17, 17]}
    item={item}
    size={size}
    />
  </Suspense>
</group>
    </View>
  );
};
export default ModelView