import { Building } from './building.model';
import { Enemy } from './enemy.model';
import { Vector2D } from './vector2d.model';

export class SpaceShipEnsign extends Enemy {
    static readonly DAMAGE: number = 4;
    static readonly RANGE: number = 150;
    static readonly HEALTH: number = 100;

    constructor(position: Vector2D) {
        super(SpaceShipEnsign.HEALTH, SpaceShipEnsign.DAMAGE, SpaceShipEnsign.RANGE, position);
    }

    // Feind zeichnen
    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red';  // Farbe für das feindliche Raumschiff
        ctx.fillRect(this.position.x, this.position.y, 30, 30);// TODO: Change drawing position?
        ctx.fillStyle = 'white';
        ctx.fillText('Ensign', this.position.x, this.position.y - 5);
    }

    // Angriffsmethode gegen ein Gebäude
    override attack(building: Building): void {
        building.damagePoints -= this.damage;
    }
}
