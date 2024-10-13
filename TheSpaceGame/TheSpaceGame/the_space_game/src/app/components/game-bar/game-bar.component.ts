import { Component, EventEmitter, Output } from '@angular/core';
import { Buildings } from 'src/app/enums/buildings.enum';
import { GameManagerService } from 'src/app/services/game-manager.service';
import { Moment } from 'moment/moment';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-game-bar',
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.css'],
})
export class GameBarComponent {
  Buildings = Buildings;

  private selectedBuildingType: Buildings | null = null;
  private selectedBuildingElement: HTMLElement | null = null;
  @Output() selectedBuildingEvent = new EventEmitter<Buildings>();

  constructor(private gameService: GameManagerService) {}

  selectBuilding(buildingType: Buildings, event: MouseEvent): void {
    const target = (event.target as HTMLElement).closest(
      '.building-btn'
    ) as HTMLElement;
    if (!target) {
      return;
    } // selects the respective button and considers the span or other elements inside the btn

    // highlights the currently selected building
    if (
      this.selectedBuildingElement &&
      this.selectedBuildingElement !== target
    ) {
      this.selectedBuildingElement.style.backgroundColor = '';
      // reset of the previous building
    }
    target.style.backgroundColor = 'aquamarine';
    this.selectedBuildingElement = target;
    this.selectedBuildingType = buildingType; // Setzt den aktuellen Gebäudetyp

    this.selectedBuildingEvent.emit(buildingType); // emit to game canvas
  }

  // #getTime(): Date {
  //   return new Date(this.gameService.getRunningTime());
  // }

  public getTimeString(): String {
    // let test: Date = this.#getTime();

    return moment().format('h:mm:ss a'); // October 7th 2024, 11:30:50 am
  }
}
