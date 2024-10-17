import { Building } from './building.model';
import { Vector2D } from './vector2d.model';

export abstract class PlaceableBuilding extends Building {
  constructor(
    buildCosts: number,
    damagePoints: number,
    level: number,
    position: Vector2D,
    health: number,
    width: number,
    height: number,
    public upgradeCosts: number,
  ) {
    super(buildCosts, damagePoints, level, position, health, width, height);
  }
}
