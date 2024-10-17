import { PlaceableBuilding } from '../models/placeable-building.model';
import { IntermediateBuilding } from '../models/intermediate-building.model';
import { Enemy } from '../models/enemy.model';
import { Vector2D } from '../models/vector2d.model';

export abstract class AbstractGameEntityFactory {
  public abstract CreateReactor(position: Vector2D): PlaceableBuilding;
  public abstract CreateEnergyStorage(position: Vector2D): PlaceableBuilding;
  public abstract CreateMiner(position: Vector2D): PlaceableBuilding;
  public abstract CreateLaser(position: Vector2D): PlaceableBuilding;
  public abstract CreateLongRangeMissileStation(
    position: Vector2D,
  ): PlaceableBuilding;
  public abstract CreateRepairStation(position: Vector2D): PlaceableBuilding;
  public abstract CreateEnergyGridConnector(
    position: Vector2D,
    startposition: Vector2D,
    endposition: Vector2D,
  ): IntermediateBuilding;
  public abstract CreateSpaceShipCrusader(position: Vector2D): Enemy;
  public abstract CreateSpaceShipEnsign(position: Vector2D): Enemy;
}
