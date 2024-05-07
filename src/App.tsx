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

  const updatePosition = (m: MassProps) => {
    return { ...m, pos: m.pos.sum(m.v) };
  };

  const step = () => {
    setMasses((prevState: MassProps[]) => {
      return prevState.map((m: MassProps) => {
        console.log(m);
        return updatePosition(m);
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
      {masses.map((m: MassProps) => (
        <Mass {...m} key={m.id} />
      ))}
    </div>
  );
}

export default App;
