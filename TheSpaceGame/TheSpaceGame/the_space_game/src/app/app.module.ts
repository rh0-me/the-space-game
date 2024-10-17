import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';

import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { GameViewComponent } from './views/game-page/game-page.component';
import { TheSpaceGameCanvasComponent } from './components/the-space-game-canvas/the-space-game-canvas.component';
import { ResourcePanelComponent } from './components/resource-panel/resource-panel.component';
import { GameBarComponent } from './components/game-bar/game-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPageComponent,
    GameViewComponent,
    TheSpaceGameCanvasComponent,
    ResourcePanelComponent,
    GameBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
