import * as THREE from "three"
import { PerspectiveCamera, View } from "@react-three/drei";
import Lights from "../lights";
import { Suspense } from "react";

 type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<HTMLDivElement | null>;
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
      className={`border border-red-500 w-full h-full ${index === 2} ? 'right-[-100%] : ''`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3}/>

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0 , 0, 4]}/>
<Lights/>

<Suspense fallback={<div>Loading</div>}/>
    </View>
  );
};
export default ModelView