import { Component } from '@angular/core';
import { EconomyService } from 'src/app/services/economy.service';

@Component({
  selector: 'app-resource-panel',
  templateUrl: './resource-panel.component.html',
  styleUrls: ['./resource-panel.component.css']
})
export class ResourcePanelComponent {

    constructor(private economyService: EconomyService) {}

    get energy(): number {
        return this.economyService.getEnergy();
    }

    get minerals(): number {
        return this.economyService.getMinerals();
    }
}
