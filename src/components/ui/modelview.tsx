import * as THREE from "three"


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
    <div
      data-index={index}
      data-gsap-type={gsapType}
      data-size={size}
      ref={controlRef}
      style={{ color: item.color[0] }}
    >
      {item.title}
    </div>
  );
};
export default ModelView