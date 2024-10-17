import { Building } from './building.model';
import { Enemy } from './enemy.model';
import { Vector2D } from './vector2d.model';

export class SpaceShipCrusader extends Enemy {
    static readonly DAMAGE: number = 8;
    static readonly RANGE: number = 250;
    static readonly HEALTH: number = 200;

    constructor(position: Vector2D) {
        super(SpaceShipCrusader.HEALTH, SpaceShipCrusader.DAMAGE, SpaceShipCrusader.RANGE, position);
    }

    // Feind zeichnen
    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'blue';  // Farbe für das feindliche Raumschiff
        ctx.fillRect(this.position.x, this.position.y, 40, 40); //TODO: Change drawing position?
        ctx.fillStyle = 'white';
        ctx.fillText('Crusader', this.position.x, this.position.y - 5);
    }

    // Angriffsmethode gegen ein Gebäude
    override attack(building: Building): void {
        building.damagePoints -= this.damage;
    }
}
