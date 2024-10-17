import { PlaceableBuilding } from './placeable-building.model';
import { Vector2D } from './vector2d.model';

export class EnergyStorage extends PlaceableBuilding {
  static readonly energyStoragePerLevel: number[] = [50, 110, 170];

  static readonly DAMAGE_POINTS: number = 250;
  static readonly BUILD_COSTS: number = 30;
  static readonly UPGRADE_COSTS: number = 20;

  static readonly VECTOR_HEIGHT: number = 50;
  static readonly VECTOR_WIDTH: number = 50;

  constructor(position: Vector2D) {
    super(
      EnergyStorage.BUILD_COSTS,
      EnergyStorage.DAMAGE_POINTS,
      1,
      position,
      EnergyStorage.DAMAGE_POINTS,
      EnergyStorage.VECTOR_WIDTH,
      EnergyStorage.VECTOR_HEIGHT,
      EnergyStorage.UPGRADE_COSTS,
    );
  }

  getEnergyCapacity(): number {
    return EnergyStorage.energyStoragePerLevel[this.level - 1];
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    const energyStorageImage = new Image();
    energyStorageImage.src = 'assets/icons/energy_storage.png';

    if (energyStorageImage.complete) {
      ctx.fillStyle = 'white';
      ctx.drawImage(
        energyStorageImage,
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint,
        50,
        50,
      );
      ctx.fillText(
        'Energy Station',
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint - 5,
      );
      ctx.fillText(
        `Level: ${this.level}`,
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint + 75,
      );
    }
  }
}
