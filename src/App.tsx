import { useEffect, useState } from "react";
import Mass from "./components/mass";
import { MassProps } from "./components/mass";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Vector2D } from "./common/vector2d";

function App() {
  const [masses, setMasses] = useState<MassProps[]>([]);

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const draw = (e: any) => {
    const { clientX, clientY } = e;

    setMasses((prevState: MassProps[]) => {
      const mass = getRandomInt(10, 50);
      const current = {
        id: uuidv4(),
        mass: getRandomInt(10, 50),
        pos: new Vector2D(clientX + mass / 2, clientY + mass / 2),
        v: new Vector2D(getRandomInt(-5, 5), getRandomInt(-5, 5)),
      };

      return [...prevState, current];
    });
  };

  const updateKinematics = (m: MassProps, masses: MassProps[]) => {
    let a = new Vector2D(0, 0);
    for (let mi of masses) {
      if (mi.id != m.id) {
        const g = 50; // no but whatever
        const aMag = (g * mi.mass) / m.pos.squaredistance(mi.pos);
        const theta = m.pos.angle(mi.pos);
        a = a.sum(new Vector2D(Math.cos(theta), Math.sin(theta)).scale(aMag));
      }
    }
    return { ...m, pos: m.pos.sum(m.v), v: m.v.sum(a) };
  };

  const step = () => {
    setMasses((prevState: MassProps[]) => {
      return prevState.map((m: MassProps) => {
        return updateKinematics(m, prevState);
      });
    });
  };

  useEffect(() => {
    document.addEventListener("click", draw);
    return () => {
      document.removeEventListener("click", draw);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      step();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        {masses.map((m: MassProps) => (
          <Mass {...m} key={m.id} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          // TODO: evict any masses that get too far away?
          // outside of view window? no, they interact gravitationally
          // should be outside of "relevance" threshold
          setMasses([]);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
