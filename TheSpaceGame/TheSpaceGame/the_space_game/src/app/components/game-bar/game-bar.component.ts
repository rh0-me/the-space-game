import { Component } from '@angular/core';
import { Buildings } from 'src/app/enums/buildings.enum';
import { GameManagerService } from 'src/app/services/game-manager.service';
import {Moment} from 'moment/moment';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-game-bar',
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.css']
})
export class GameBarComponent {

  Buildings = Buildings;

  private selectedBuildingType: Buildings | null = null;

  constructor(private gameService: GameManagerService) {}

  selectBuilding(buildingType: Buildings): void {
    this.selectedBuildingType = buildingType;  // Setzt den aktuellen Gebäudetyp
  }

  #getTime(): Date {
    return new Date(this.gameService.getRunningTime());
  }

  public getTimeString(): String {
    let test: Date = this.#getTime();
    
    return moment().format('h:mm:ss a'); // October 7th 2024, 11:30:50 am
  }

}
