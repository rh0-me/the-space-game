import { Injectable } from '@angular/core';
import { EconomyService } from './economy.service';
import { EnemyWaveManagerService } from './enemy-wave-manager.service';
import { PlaceableBuilding } from '../models/placeable-building.model';
import { Building } from '../models/building.model';
import { Vector2D } from '../models/vector2d.model';
import { Reactor } from '../models/reactor.model';
import { Miner } from '../models/miner.model';
import { Laser } from '../models/laser.model';
import { Buildings } from '../enums/buildings.enum';
import { EnergyStorage } from '../models/energy-storage.model';
import { LongRangeMissileStation } from '../models/long-range-missile-station.model';
import { RepairStation } from '../models/repair-station.model';
import { EnergyGridConnector } from '../models/energy-grid-connector.model';

@Injectable({
    providedIn: 'root'
})
export class GameManagerService {

    private isGameRunning: boolean = false;
    private timeRunning: Date = new Date();

    constructor(
        private economyService: EconomyService,
        private enemyWaveManager: EnemyWaveManagerService
    ) {
        this.#initializeGame();
    }

    #initializeGame(): void {
        this.isGameRunning = true;
        this.timeRunning = new Date();

        // Spiel initialisieren, z.B. Startressourcen festlegen
        this.economyService.addMinerals(1000);
        this.economyService.produceEnergy(1000);
    }

    public getRunningTime(): number {
        var time = new Date().getTime() - this.timeRunning.getTime();
        return time;
    }

    updateGame(): void {
        // Hauptspiel-Update, das die Timer und Gegnerwellen aktualisiert
        this.enemyWaveManager.updateEnemies();
        // Weitere Spielmechaniken wie Ressourcenproduktion
    }

    checkGameOver(): boolean {
        // Überprüfen, ob das Spiel vorbei ist (z.B. alle Gebäude zerstört oder Zeit abgelaufen)
        return false;  // Beispiel
    }

    placeBuilding(building: PlaceableBuilding): void {
        // Logik, um ein Gebäude zu platzieren
        if (this.economyService.consumeMinerals(building.buildCosts)) {
            // Gebäude hinzufügen
        }
    }

    createBuilding(buildingType: Buildings, position: Vector2D): Building | null {
        let newBuilding: Building | null = null;
        switch (buildingType) {
            
            case Buildings.Reactor:
                if (this.economyService.consumeMinerals(20)) {
                    newBuilding = new Reactor(position);
                }
                break;
            case Buildings.Miner:
                if (this.economyService.consumeMinerals(10)) {
                    newBuilding = new Miner(position);
                }
                break;
            case Buildings.Laser:
                if (this.economyService.consumeMinerals(15)) {
                    newBuilding = new Laser(position);
                }
                break;
            case Buildings.EnergyStorage:
                if (this.economyService.consumeMinerals(25)) {
                    newBuilding = new EnergyStorage(position);
                }
                break;
            case Buildings.EnergyGridConnector:
                if (this.economyService.consumeMinerals(5)) {
                    newBuilding = new EnergyGridConnector(new Vector2D(0,0), new Vector2D(0, 0), new Vector2D(5, 5));
                }
                break;
            case Buildings.LongRangeMissileStation:
                if (this.economyService.consumeMinerals(30)) {
                    newBuilding = new LongRangeMissileStation(position);
                }
                break;
                case Buildings.RepairStation:
                if (this.economyService.consumeMinerals(30)) {
                    newBuilding = new RepairStation(position);
                }
                break;

        }

        return newBuilding;
    }

}
