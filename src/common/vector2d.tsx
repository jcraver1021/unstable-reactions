class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  sum(other: Vector2D) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  scale(m: number) {
    return new Vector2D(this.x * m, this.y * m);
  }
}

export { Vector2D };
