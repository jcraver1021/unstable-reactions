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

  squaredistance(other: Vector2D) {
    return (other.x - this.x) ** 2 + (other.y - this.y) ** 2;
  }

  angle(other: Vector2D) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }
}

export { Vector2D };
