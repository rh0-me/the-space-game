import { PlaceableBuilding } from './placeable-building.model';
import { Vector2D } from './vector2d.model';

export class LongRangeMissileStation extends PlaceableBuilding {
  static readonly levelRanges: number[] = [250, 400];
  static readonly levelDamage: number[] = [20, 40];
  static readonly levelEnergyUsage: number[] = [5, 7];
  static readonly levelMineralUsage: number[] = [2, 4];
  static readonly DAMAGE_POINTS: number = 150;
  static readonly BUILD_COSTS: number = 40;
  static readonly UPGRADE_COSTS: number = 30;

  static readonly VECTOR_HEIGHT: number = 50;
  static readonly VECTOR_WIDTH: number = 50;

  constructor(position: Vector2D, level: number = 1) {
    super(
      LongRangeMissileStation.BUILD_COSTS,
      LongRangeMissileStation.DAMAGE_POINTS,
      1,
      position,
      LongRangeMissileStation.DAMAGE_POINTS,
      LongRangeMissileStation.VECTOR_WIDTH,
      LongRangeMissileStation.VECTOR_HEIGHT,
      LongRangeMissileStation.UPGRADE_COSTS,
    );

    this.buildCosts = LongRangeMissileStation.BUILD_COSTS;
    this.damagePoints = LongRangeMissileStation.DAMAGE_POINTS;
    this.upgradeCosts = LongRangeMissileStation.UPGRADE_COSTS;
  }

  // Gibt die Reichweite basierend auf dem Level zurück
  getRange(): number {
    return LongRangeMissileStation.levelRanges[this.level - 1];
  }

  // Gibt den Schaden basierend auf dem Level zurück
  getDamage(): number {
    return LongRangeMissileStation.levelDamage[this.level - 1];
  }

  // Gebäude zeichnen
  override draw(ctx: CanvasRenderingContext2D): void {
    const lrmsImage = new Image();
    lrmsImage.src = 'assets/icons/long_range_missile_station.png';

    if (lrmsImage.complete) {
      ctx.fillStyle = 'white';
      ctx.drawImage(
        lrmsImage,
        this.xDrawingStartingPoint,
        this.yDrawingStartingPoint,
        50,
        50,
      );

      ctx.fillText(
        'LRMS',
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
