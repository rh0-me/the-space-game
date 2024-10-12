import { PlaceableBuilding } from "./placeable-building.model";
import { Vector2D } from "./vector2d.model";

export class Reactor extends PlaceableBuilding {

    static readonly energyProductionPerLevel: number[] = [5, 11, 17];

    static readonly DAMAGE_POINTS: number = 200;
    static readonly BUILD_COSTS: number = 20;
    static readonly UPGRADE_COSTS: number = 15;
    static readonly VECTOR_HEIGHT: number = 50;
    static readonly VECTOR_WIDTH: number = 50;


    constructor(
        position: Vector2D,
    ) {
        super(Reactor.BUILD_COSTS, Reactor.DAMAGE_POINTS, 1, position, Reactor.DAMAGE_POINTS, Reactor.VECTOR_WIDTH, Reactor.VECTOR_HEIGHT, Reactor.UPGRADE_COSTS);
    }

    getGeneratedEnergy(): number {
        return Reactor.energyProductionPerLevel[this.level - 1];
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        const reactorImage = new Image();
        reactorImage.src = 'assets/icons/reactor.png';
        
        if (reactorImage.complete) {
            ctx.fillStyle = 'white';
            ctx.drawImage(reactorImage, this.position.x, this.position.y, Reactor.VECTOR_WIDTH, Reactor.VECTOR_HEIGHT);

            ctx.fillText("Reactor", this.position.x, this.position.y - 5);
            ctx.fillText(`Level: ${this.level}`, this.position.x, this.position.y + 75);
        }
    }

}
