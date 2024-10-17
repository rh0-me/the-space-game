import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPageComponent } from './views/menu-page/menu-page.component';
import { GameViewComponent } from './views/game-page/game-page.component';

const routes: Routes = [
  { path: 'menu', component: MenuPageComponent },
  { path: 'game', component: GameViewComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
