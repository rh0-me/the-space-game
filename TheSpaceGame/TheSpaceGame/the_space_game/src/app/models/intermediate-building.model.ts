import { Building } from './building.model';
import { Vector2D } from './vector2d.model';

export abstract class IntermediateBuilding extends Building {
  constructor(
    buildCosts: number,
    damagePoints: number,
    level: number,
    position: Vector2D,
    health: number,
    width: number,
    height: number,
    public startBuilding: Vector2D,
    public endBuilding: Vector2D,
  ) {
    super(buildCosts, damagePoints, level, position, health, width, height);
  }
}
