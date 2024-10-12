export class Vector2D {
    constructor(public x: number = 0, public y: number = 0) { }

    public add(vector: Vector2D): Vector2D {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector: Vector2D): Vector2D {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    public scale(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2D {
        const magnitude = this.length();
        return magnitude === 0 ? new Vector2D() : new Vector2D(this.x / magnitude, this.y / magnitude);
    }

    public distanceTo(other: Vector2D): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);  // Euklidische Distanz
    }

}