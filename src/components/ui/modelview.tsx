import * as THREE from "three"
import { PerspectiveCamera, View } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Lights from "../lights";
import { Suspense } from "react";
import IPhone from "../iphone"; 

 type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<typeof OrbitControls | null>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: {
      title: string;
      color: string[];
      img: string;
  };
  size: string;
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
enablePen={false}
rotateSpeed={0.4}
target ={new THREE.Vector3(0,0,0)}
onEnd={() => {
  if (controlRef.current) {
    setRotationState((controlRef.current as unknown as THREE.OrbitControls).getAzimuthalAngle());
  }
}}
/>
<group ref={groupRef} position={[0, 0, 0]} name={`${index === 1} ? 'small' : 'large' `}>
  {/* <meshStandardMaterial color={item.color[0]} /> */}
  <Suspense fallback={<html> <div>Loading</div> </html>}>
    <IPhone 
    scale={index === 1 ? [15, 15 , 15] : [17, 17, 17]}/>
  </Suspense>
</group>
    </View>
  );
};
export default ModelView