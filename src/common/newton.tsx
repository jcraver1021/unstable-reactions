import { Vector2D } from "./vector2d";

const G = 50;

class NewtonianMass {
  id: string;
  // We're just gonna pretend we're in SI units
  mass: number;
  pos: Vector2D;
  vel: Vector2D;

  constructor(id: string, mass: number, initPos: Vector2D, initVel: Vector2D) {
    this.id = id;
    this.mass = mass;
    this.pos = initPos;
    this.vel = initVel;
  }

  newPosition(t: number) {
    return this.pos.sum(this.vel.scale(t));
  }

  newVelocity(t: number, masses: NewtonianMass[]) {
    let a = new Vector2D(0, 0);
    for (let m of masses) {
      const d = this.pos.squaredistance(m.pos);
      // we should fuse overlapping masses but for now just let them pass through
      if (d != 0) {
        const theta = this.pos.angle(m.pos);
        a = a.sum(
          new Vector2D(Math.cos(theta), Math.sin(theta)).scale(
            (G * m.mass) / d,
          ),
        );
      }
    }
    return this.vel.sum(a.scale(t));
  }

  next(t: number, masses: NewtonianMass[]) {
    return new NewtonianMass(
      this.id,
      this.mass,
      this.newPosition(t),
      this.newVelocity(t, masses),
    );
  }
}

export { NewtonianMass };
