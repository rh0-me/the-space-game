import { Vector2D } from './vector2d.model';
import { Building } from './building.model';

export abstract class Enemy {
    constructor(
        public health: number,       // Gesundheit des Feindes
        public damage: number,       // Schaden, den der Feind pro Angriff verursacht
        public range: number,        // Reichweite des Angriffs
        public position: Vector2D    // Position des Feindes
    ) {}

    // Methode zum Zeichnen des Feindes auf das Canvas
    abstract draw(ctx: CanvasRenderingContext2D): void;

    // Methode zum Angreifen eines Gebäudes
    attack(building: Building): void {
        if (this.isInRange(building)) {
            building.damagePoints -= this.damage;  // Verursacht Schaden am Gebäude
        }
    }

    // Bewegen des Feindes
    move(target: Vector2D): void {
        const direction = target.subtract(this.position).normalize();  // Richtung zum Ziel
        this.position = this.position.add(direction);  // Position des Feindes aktualisieren
    }

    // Überprüfen, ob das Gebäude in Angriffsreichweite ist
    isInRange(building: Building): boolean {
        const distance = this.position.distanceTo(/*building.position*/new Vector2D(0, 0));
        return distance <= this.range;
    }

    // Methode, um festzustellen, ob der Feind tot ist (Gesundheit <= 0)
    isDead(): boolean {
        return this.health <= 0;
    }
}
