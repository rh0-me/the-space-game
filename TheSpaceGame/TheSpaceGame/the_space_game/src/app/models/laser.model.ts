import { PlaceableBuilding } from './placeable-building.model';
import { Vector2D } from './vector2d.model';

export class Laser extends PlaceableBuilding {
    static readonly levelRanges: number[] = [150, 200, 250];
    static readonly levelDamage: number[] = [10, 15, 20];
    static readonly levelEnergyUsage: number[] = [5, 7, 9];
    static readonly DAMAGE_POINTS: number = 150;
    static readonly BUILD_COSTS: number = 15;
    static readonly UPGRADE_COSTS: number = 15;

    static readonly VECTOR_HEIGHT: number = 50;
    static readonly VECTOR_WIDTH: number = 50;


    constructor(position: Vector2D) {
        super(Laser.BUILD_COSTS, Laser.DAMAGE_POINTS, 1, position, Laser.DAMAGE_POINTS, Laser.VECTOR_WIDTH, Laser.VECTOR_HEIGHT, Laser.UPGRADE_COSTS);
    }

    // Gibt die Reichweite des Lasers basierend auf dem Level zurück
    getRange(): number {
        return Laser.levelRanges[this.level - 1];
    }

    // Gibt den Schaden des Lasers basierend auf dem Level zurück
    getDamage(): number {
        return Laser.levelDamage[this.level - 1];
    }

    // Zeichne den Laser auf das Canvas
    override draw(ctx: CanvasRenderingContext2D): void {
        
        const laserImage = new Image();
        laserImage.src = 'assets/icons/laser.png';

        if (laserImage.complete) {
            ctx.fillStyle = 'white';
            ctx.drawImage(laserImage, this.position.x, this.position.y, 50, 50);

            ctx.fillText("Laser", this.position.x, this.position.y - 5);
            ctx.fillText(`Level: ${this.level}`, this.position.x, this.position.y + 75);
        }
    }
}
