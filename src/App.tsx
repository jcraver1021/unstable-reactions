import { useEffect, useState } from "react";
import Mass from "./components/mass";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Vector2D } from "./common/vector2d";
import { NewtonianMass } from "./common/newton";

function App() {
  const [masses, setMasses] = useState<NewtonianMass[]>([]);

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const draw = (e: any) => {
    const { clientX, clientY } = e;

    setMasses((prevState: NewtonianMass[]) => {
      const mass = getRandomInt(10, 50);
      const current = new NewtonianMass(
        uuidv4(),
        getRandomInt(10, 50),
        new Vector2D(clientX + mass / 2, clientY + mass / 2),
        new Vector2D(getRandomInt(-5, 5), getRandomInt(-5, 5)),
      );

      return [...prevState, current];
    });
  };

  const step = () => {
    // TODO: Handle collisions
    setMasses((prevState: NewtonianMass[]) => {
      return prevState.map((m: NewtonianMass) => {
        return m.next(1, prevState);
      });
    });
  };

  useEffect(() => {
    // TODO: Attach to a smaller component for visualization
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
        {masses.map((m: NewtonianMass) => (
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
