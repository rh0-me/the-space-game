import { Injectable } from '@angular/core';
import { Enemy } from '../models/enemy.model';

@Injectable({
  providedIn: 'root'
})
export class EnemyWaveManagerService {
  public enemies: Enemy[] = [];

  spawnWave(waveNumber: number): void {
    // Logik zum Spawnen einer neuen Gegnerwelle basierend auf der Welle
    for (let i = 0; i < waveNumber * 5; i++) {
      //this.enemies.push(new Enemy(/* Position, Reichweite, Schaden etc. */));
    }
  }

  updateEnemies(): void {
    // Logik zum Bewegen und Angreifen der Feinde
    //this.enemies.forEach(enemy => enemy.move());
  }
}
