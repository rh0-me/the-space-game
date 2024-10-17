import { PlaceableBuilding } from './placeable-building.model';
import { Vector2D } from './vector2d.model';

export class Miner extends PlaceableBuilding {
  static readonly miningRatePerLevel: number[] = [10, 22]; // Stufe 1: 10, Stufe 2: 22

  static readonly DAMAGE_POINTS: number = 100;
  static readonly BUILD_COSTS: number = 10;
  static readonly UPGRADE_COSTS: number = 10;
  static readonly VECTOR_HEIGHT: number = 50;
  static readonly VECTOR_WIDTH: number = 50;

  constructor(position: Vector2D) {
    super(
      Miner.BUILD_COSTS,
      Miner.DAMAGE_POINTS,
      1,
      position,
      Miner.DAMAGE_POINTS,
      Miner.VECTOR_WIDTH,
      Miner.VECTOR_HEIGHT,
      Miner.UPGRADE_COSTS
    );
  }

  // Gibt die Abbaurate basierend auf dem Level zurück
  getMiningRate(): number {
    return Miner.miningRatePerLevel[this.level - 1];
  }

  // Gebäude zeichnen
  override draw(ctx: CanvasRenderingContext2D): void {
    const minerImage = new Image();
    minerImage.src = 'assets/icons/miner.png';

    if (minerImage.complete) {
      ctx.fillStyle = 'white';
      ctx.drawImage(
        minerImage,
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint,
        50,
        50
      );

      ctx.fillText(
        'Miner',
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint - 5
      );
      ctx.fillText(
        `Level: ${this.level}`,
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint + 75
      );
    }
  }
}
