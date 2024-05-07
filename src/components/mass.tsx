//import styles from './Mass.module.css';
import { Vector2D } from "../common/vector2d";

export type MassProps = {
  id: string;
  pos: Vector2D;
  v: Vector2D;
  mass: number;
};

export default function Mass(props: MassProps) {
  return (
    <div
      style={{
        position: "absolute",
        width: `${props.mass}px`,
        height: `${props.mass}px`,
        borderRadius: "50%",
        background: "blue",
        top: props.pos.y - props.mass,
        left: props.pos.x - props.mass,
      }}
    ></div>
  );
}
