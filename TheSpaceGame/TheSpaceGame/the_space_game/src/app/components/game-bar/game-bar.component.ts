import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Buildings } from 'src/app/enums/buildings.enum';
import { GameManagerService } from 'src/app/services/game-manager.service';
import { Moment } from 'moment/moment';
import * as moment from 'moment/moment';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-game-bar',
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.css'],
})
export class GameBarComponent {
  Buildings = Buildings;

  private readonly keys: { [key: string]: boolean } = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
  };
  private currentBuildingType: Buildings | null = null;
  private currentSelectedBuildingElement: HTMLElement | null = null;
  @Output() selectedBuildingEvent = new EventEmitter<Buildings>();

  constructor(private gameService: GameManagerService) {}
  //#region BuildingClickHandler
  buildingClickHandler(buildingType: Buildings, event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) {
      return;
    }
    this.highlightAndSelectToggle(target, buildingType);
  }
  private highlightAndSelectToggle(
    target: HTMLElement,
    buildingType: Buildings
  ) {
    let selectedBuildingType = undefined;
    if (!this.isCurrentlySelectedBuilding(target)) {
      this.resetSelectionAndHighlight();
      this.selectAndHighlightBuilding(target, buildingType);
      selectedBuildingType = buildingType;
    } else {
      this.resetSelectionAndHighlight();
    }
    console.log(
      'Buildingtype:',
      this.currentBuildingType,
      'BuildingElement:',
      this.currentSelectedBuildingElement
    );

    this.selectedBuildingEvent.emit(selectedBuildingType); // emit selected building type to game canvas
  }
  private isCurrentlySelectedBuilding(target: HTMLElement) {
    return (
      this.currentSelectedBuildingElement &&
      this.currentSelectedBuildingElement === target
    );
  }

  private resetSelectionAndHighlight(): void;
  private resetSelectionAndHighlight(
    buildingType: Buildings,
    target: HTMLElement
  ): void;
  private resetSelectionAndHighlight(): void {
    if (this.currentSelectedBuildingElement !== null) {
      this.currentSelectedBuildingElement.style.backgroundColor = '';
      this.currentSelectedBuildingElement = null;
    }
    if (this.currentBuildingType !== null) {
      this.currentBuildingType = null;
    }
  }

  private selectAndHighlightBuilding(
    target: HTMLElement,
    buildingType: Buildings
  ): void {
    target.style.backgroundColor = 'aquamarine';
    this.currentSelectedBuildingElement = target;
    this.currentBuildingType = buildingType;
  }
  //#endregion

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    this.keys[event.key] = true;
    console.log(this.keys);

    const result = this.getBuildingAndButton(event.key);
    if (result) {
      const [buildingType, buildingButton] = result;
      if (buildingButton) {
        if (buildingButton instanceof HTMLElement) {
          buildingButton.style.backgroundColor = 'aquamarine';
        }
      }
      this.selectedBuildingEvent.emit(buildingType as Buildings);
    }
  }

  // Listener für das Loslassen der Tasten
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    this.keys[event.key] = false;
    console.log(this.keys);
    const result = this.getBuildingAndButton(event.key);
    if (result) {
      const [building, buildingButton] = result;
      if (buildingButton) {
        if (result) {
          if (buildingButton instanceof HTMLElement) {
            buildingButton.style.backgroundColor = '';
          }
          this.selectedBuildingEvent.emit(undefined);
        }
      }
    }
  }
  private getBuildingAndButton(key: string) {
    let buildingType: Buildings | null = null;
    let buildingButton: HTMLElement | null = null;
    switch (key) {
      case '1':
        buildingType = Buildings.Reactor;
        buildingButton = document.getElementsByClassName(
          'reactor'
        )[0] as HTMLElement;
        break;
      case '2':
        buildingType = Buildings.Laser;
        buildingButton = document.getElementsByClassName(
          'laser'
        )[0] as HTMLElement;
        break;
      case '3':
        buildingType = Buildings.LongRangeMissileStation;
        buildingButton = document.getElementsByClassName(
          'missile-station'
        )[0] as HTMLElement;
        break;
      case '4':
        buildingType = Buildings.Miner;
        buildingButton = document.getElementsByClassName(
          'miner'
        )[0] as HTMLElement;
        break;
      case '5':
        buildingType = Buildings.EnergyStorage;
        buildingButton = document.getElementsByClassName(
          'energy-storage'
        )[0] as HTMLElement;
        break;
      case '6':
        buildingType = Buildings.EnergyGridConnector;
        buildingButton = document.getElementsByClassName(
          'grid-connector'
        )[0] as HTMLElement;
        break;
      case '7':
        buildingType = Buildings.RepairStation;
        buildingButton = document.getElementsByClassName(
          'repair-station'
        )[0] as HTMLElement;
        break;
      default:
        return;
    }
    if (buildingButton === null) {
      throw new Error('Building button not found');
    }
    return [buildingType, buildingButton];
  }
  public getTimeString(): String {
    return moment().format('h:mm:ss a'); // October 7th 2024, 11:30:50 am
  }
}
