import { Enemy } from '../models/enemy.model';
import { IntermediateBuilding } from '../models/intermediate-building.model';
import { PlaceableBuilding } from '../models/placeable-building.model';
import { AbstractGameEntityFactory } from './abstract-game-entity-factory';
import { Reactor } from '../models/reactor.model';
import { Vector2D } from '../models/vector2d.model';
import { EnergyStorage } from '../models/energy-storage.model';
import { Miner } from '../models/miner.model';
import { Laser } from '../models/laser.model';
import { LongRangeMissileStation } from '../models/long-range-missile-station.model';
import { RepairStation } from '../models/repair-station.model';
import { EnergyGridConnector } from '../models/energy-grid-connector.model';
import { SpaceShipCrusader } from '../models/space-ship-crusader.model';
import { SpaceShipEnsign } from '../models/space-ship-ensign.model';

export class GameEntityFactory implements AbstractGameEntityFactory {
  public CreateReactor(position: Vector2D): PlaceableBuilding {
    return new Reactor(position);
  }
  public CreateEnergyStorage(position: Vector2D): PlaceableBuilding {
    return new EnergyStorage(position);
  }
  public CreateMiner(position: Vector2D): PlaceableBuilding {
    return new Miner(position);
  }
  public CreateLaser(position: Vector2D): PlaceableBuilding {
    return new Laser(position);
  }
  public CreateLongRangeMissileStation(position: Vector2D): PlaceableBuilding {
    return new LongRangeMissileStation(position);
  }
  public CreateRepairStation(position: Vector2D): PlaceableBuilding {
    return new RepairStation(position);
  }
  public CreateEnergyGridConnector(
    position: Vector2D,
    startposition: Vector2D,
    endposition: Vector2D
  ): IntermediateBuilding {
    return new EnergyGridConnector(position, startposition, endposition);
  }
  public CreateSpaceShipCrusader(position: Vector2D): Enemy {
    return new SpaceShipCrusader(position);
  }
  public CreateSpaceShipEnsign(position: Vector2D): Enemy {
    return new SpaceShipEnsign(position);
  }
}
