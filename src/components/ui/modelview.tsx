import * as THREE from "three"
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Lights from "../lights";
import { Suspense } from "react";
import IPhone from "../iphone"; 

 export type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<ThreeOrbitControls>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: {
      title: string;
      color: ["#8F8A81", "#FFE7B9", "#6F6C64", "#C7C2B5"];
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
      // data-size={size}
      // ref={controlRef}
      // style={{ color: item.color[0] }}
      className={` w-full h-full ${index === 2} ? 'right-[-100%] : ''`}
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
    setRotationState((controlRef.current as typeof OrbitControls.prototype).getAzimuthalAngle());
  }
}}
/>
<group ref={groupRef} position={[0, 0, 0]} name={`${index === 1} ? 'small' : 'large' `}>
  {/* <meshStandardMaterial color={item.color[0]} /> */}
  <Suspense fallback={<html> <div>Loading</div> </html>}>
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