import { PlaceableBuilding } from './placeable-building.model';
import { Vector2D } from './vector2d.model';
import { Building } from './building.model';

export class RepairStation extends PlaceableBuilding {
    static readonly REPAIR_RANGE: number = 300;  // Reparaturreichweite in Einheiten
    static readonly REPAIR_AMOUNT: number = 10;  // Wie viel Schaden pro Tick repariert wird
    static readonly ENERGY_USAGE: number = 4;    // Energie, die pro Reparatur verbraucht wird
    static readonly MINERAL_USAGE: number = 2;   // Mineralien, die pro Reparatur verbraucht werden
    static readonly DAMAGE_POINTS: number = 150; // Gesundheit der Reparaturstation
    static readonly BUILD_COSTS: number = 30;    // Baukosten
    static readonly UPGRADE_COSTS: number = 20;  // Upgrade-Kosten für die nächste Stufe

    static readonly VECTOR_HEIGHT: number = 50;
    static readonly VECTOR_WIDTH: number = 50;

    constructor(position: Vector2D, level: number = 1) {
        super(RepairStation.BUILD_COSTS, RepairStation.DAMAGE_POINTS, 1, position, RepairStation.DAMAGE_POINTS, RepairStation.VECTOR_WIDTH, 
            RepairStation.VECTOR_HEIGHT, RepairStation.UPGRADE_COSTS);
    }

    // Gibt die Reparaturreichweite zurück
    getRepairRange(): number {
        return RepairStation.REPAIR_RANGE;
    }

    // Führt die Reparatur eines Gebäudes durch, das sich in Reichweite befindet
    repair(building: PlaceableBuilding): void {
        if (this.isInRange(building)) {
            building.damagePoints += RepairStation.REPAIR_AMOUNT;
            // Maximale Gesundheit des Gebäudes nicht überschreiten
            if (building.damagePoints > building.damagePoints) {
                building.damagePoints = building.damagePoints;
            }
        }
    }

    // Überprüfen, ob ein Gebäude innerhalb der Reparaturreichweite liegt
    isInRange(building: PlaceableBuilding): boolean {
        const distance = this.position.distanceTo(building.position);
        return distance <= this.getRepairRange();
    }

    // Gebäude zeichnen
    override draw(ctx: CanvasRenderingContext2D): void {

        const repairStationImage = new Image();
        repairStationImage.src = 'assets/icons/repair_station.png';

        if (repairStationImage.complete) {
            ctx.fillStyle = 'white';
            ctx.drawImage(repairStationImage, this.position.x, this.position.y, 50, 50);
            ctx.fillText("Repair Station", this.position.x, this.position.y - 5);
            ctx.fillText(`Level: ${this.level}`, this.position.x, this.position.y + 75);
        }  
    }
}
