import { start } from "@popperjs/core";
import { IntermediateBuilding } from "./intermediate-building.model";
import { Vector2D } from "./vector2d.model";

export class EnergyGridConnector extends IntermediateBuilding {
    
    static readonly energyStoragePerLevel: number[] = [50, 110, 170];
    static readonly DAMAGE_POINTS: number = 250;
    static readonly BUILD_COSTS: number = 30;
    static readonly UPGRADE_COSTS: number = 20;

    static readonly VECTOR_HEIGHT: number = 50;
    static readonly VECTOR_WIDTH: number = 50;

    constructor(
        position: Vector2D,
        startPosition: Vector2D,
        endPosition: Vector2D,
    ) {
        super(EnergyGridConnector.BUILD_COSTS, EnergyGridConnector.DAMAGE_POINTS, 1, position,EnergyGridConnector.DAMAGE_POINTS,
            EnergyGridConnector.VECTOR_WIDTH, EnergyGridConnector.VECTOR_HEIGHT, startPosition, endPosition);
    }

   

    override draw(ctx: CanvasRenderingContext2D): void {
        // Zeichnen eines Rechtecks, das das Gebäude repräsentiert
    //    ctx.fillStyle = 'purple';  // Farbe für das Energy Storage Gebäude
    //    ctx.fillRect(this.position.x, this.position.y, 50, 50);  // Zeichne das Gebäude

        // Anzeigen des Namens und der Level-Kapazität
    //    ctx.fillStyle = 'white';
    //    ctx.fillText('Energy Storage', this.position.x, this.position.y - 5);  // Text über dem Gebäude

        // Kapazität anzeigen
    //    ctx.fillText(`Capacity: ${this.getEnergyCapacity()}`, this.position.x, this.position.y + 60);


        const energyStorageImage = new Image();
        //energyStorageImage.src = 'assets/icons/energy_storage.png';

        if (energyStorageImage.complete) {
            //ctx.drawImage(energyStorageImage, this.position.x, this.position.y, 50, 50);
            //2 simples line in white
            ctx.beginPath();
            
            ctx.moveTo(this.startBuilding.x, this.startBuilding.y);
            ctx.lineTo(this.endBuilding.x + 50, this.endBuilding.y + 50);
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.closePath();
        }
    }

}
