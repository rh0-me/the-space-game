import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Buildings} from 'src/app/enums/buildings.enum';
import {Building} from 'src/app/models/building.model';
import {Reactor} from 'src/app/models/reactor.model';
import {Vector2D} from 'src/app/models/vector2d.model';
import {GameManagerService} from 'src/app/services/game-manager.service';
import {GameBarComponent} from '../game-bar/game-bar.component';

@Component({
  selector: 'game-canvas',
  templateUrl: './the-space-game-canvas.component.html',
  styleUrls: ['./the-space-game-canvas.component.css'],
})
export class TheSpaceGameCanvasComponent implements OnInit {
  Buildings = Buildings;
  @ViewChild('canvas', {static: true})
  gameCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(GameBarComponent) gameBar!: GameBarComponent;

  private ctx!: CanvasRenderingContext2D;

  private isGameRunning: boolean = true; // TODO Auslagern in Game-Service

  public innerWidth: any;
  public innerHeight: any;

  private speed: number = 5;
  private rectX: number = 50;
  private rectY: number = 50;

  private keys: { [key: string]: boolean } = {};

  public buildings: Building[] = [new Reactor(new Vector2D(100, 100))]; // Liste der Gebäude auf dem Spielfeld

  private selectedBuildingType: Buildings | null = null;

  private stars: { x: number; y: number; speed: number; color: number }[] = [];
  private deathstar = {
    image: new Image(),
    laser: 0,
    x: innerWidth + 100,
    y: (innerHeight / 2) - 150,
    update: function () {
      this.x = this.x - 2/3;
      this.laser--;
    },
    draw: function (ctx: CanvasRenderingContext2D) {
      if (this.laser > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FFF'
        ctx.shadowColor = '#00960a';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 20;
        ctx.moveTo(this.x + 85, this.y + 75);
        ctx.lineTo(0, this.y + 75);
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  private music = new Audio('https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/imperial-8bit-by-crig.mp3');

  public ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    for (let i = 0; i < 500; i++) {
      this.stars.push({
        x: ~~(Math.random() * this.innerWidth),
        y: ~~(Math.random() * this.innerHeight),
        speed: ~~(1 + Math.random() * 5),
        color: ~~(Math.random() * 3),
      });
    }
    this.deathstar.image.src = 'https://cdn.rawgit.com/ManzDev/codevember2017/master/assets/death-star-256x256.png';
  }

  constructor(private gameManager: GameManagerService) {
  }

  /**
   * Einmaliges Initialisieren des Contextes und Starten des Game-Loops
   */
  public ngAfterViewInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.#startGameLoop();
  }

  #startGameLoop(): void {
    requestAnimationFrame(() => this.#updateGame());
  }

  #updateGame(): void {
    this.#clearGameCanvas();
    this.#updateRectPos();
    this.#draw();

    requestAnimationFrame(() => this.#updateGame());
  }

  #clearGameCanvas(): void {
    this.ctx.clearRect(
      0,
      0,
      this.gameCanvas.nativeElement.width,
      this.gameCanvas.nativeElement.height,
    );
  }

  #checkLegalMove(newX: number, newY: number): boolean {
    const width = this.gameCanvas.nativeElement.width;
    const height = this.gameCanvas.nativeElement.height;

    // Prüfe, ob die neue Position innerhalb der Canvas-Grenzen liegt
    if (newX < 0 || newX + 100 > width) return false; // 100 ist die Breite des Rechtecks
    if (newY < 0 || newY + 100 > height) return false; // 100 ist die Höhe des Rechtecks

    return true;
  }

  #updateRectPos(): void {
    // Überprüfe jede mögliche Bewegung und prüfe, ob sie legal ist, bevor du sie durchführst
    if (
      this.keys['w'] &&
      this.#checkLegalMove(this.rectX, this.rectY - this.speed)
    ) {
      this.rectY -= this.speed; // W - nach oben
    }
    if (
      this.keys['s'] &&
      this.#checkLegalMove(this.rectX, this.rectY + this.speed)
    ) {
      this.rectY += this.speed; // S - nach unten
    }
    if (
      this.keys['a'] &&
      this.#checkLegalMove(this.rectX - this.speed, this.rectY)
    ) {
      this.rectX -= this.speed; // A - nach links
    }
    if (
      this.keys['d'] &&
      this.#checkLegalMove(this.rectX + this.speed, this.rectY)
    ) {
      this.rectX += this.speed; // D - nach rechts
    }
  }

  buildingInGameBarSelected(building: Buildings) {
    this.selectBuilding(building);
  }

  selectBuilding(buildingType: Buildings): void {
    const canvas = this.gameCanvas.nativeElement;
    switch (buildingType) {
      case Buildings.Reactor:
        canvas.style.cursor = 'url(/assets/icons/reactor.png), auto';
        break;
      case Buildings.EnergyStorage:
        canvas.style.cursor = 'url(/assets/icons/energy_storage.png), auto';
        break;
      case Buildings.Miner:
        canvas.style.cursor = 'url(/assets/icons/miner.png), auto';
        break;
      case Buildings.Laser:
        canvas.style.cursor = 'url(/assets/icons/laser.png), auto';
        break;
      case Buildings.RepairStation:
        canvas.style.cursor = 'url(/assets/icons/repair_station.png), auto';
        break;
      case Buildings.LongRangeMissileStation:
        canvas.style.cursor =
          'url(/assets/icons/long_range_missile_station.png), auto';
        break;
      case Buildings.EnergyGridConnector:
        canvas.style.cursor =
          'url(/assets/icons/energy_grid_connector.png), auto';
        break;
      default:
        canvas.style.cursor = 'auto';
        break;
    }

    this.selectedBuildingType = buildingType; // Setzt den aktuellen Gebäudetyp
  }

  // Tastendruck-Listener hinzufügen
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    this.keys[event.key] = true;
  }

  // Listener für das Loslassen der Tasten
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    this.keys[event.key] = false;
  }

  #draw(): void {
    // Spielfeld löschen
    this.ctx.clearRect(
      0,
      0,
      this.gameCanvas.nativeElement.width,
      this.gameCanvas.nativeElement.height,
    );
    this.ctx.globalAlpha = 1.0;
    // Hintergrund des Spielfelds zeichnen (optional: Bild oder Farbe)
    this.ctx.fillStyle = '#000'; // Schwarzer Hintergrund für das Spielfeld
    this.ctx.fillRect(
      0,
      0,
      this.gameCanvas.nativeElement.width,
      this.gameCanvas.nativeElement.height,
    );
    {
      // Draw stars
      for (let i = 0; i < 500; i++) {
        var s = this.stars[i];
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = ['#444', '#888', '#FFF'][this.stars[i].color];
        this.ctx.strokeRect(s.x, s.y, 1, 1);
        this.stars[i].x -= this.stars[i].speed;
        if (this.stars[i].x < 0)
          this.stars[i].x = this.innerWidth;
      }
    }
    {
      // Draw deathstar
      this.deathstar.update();
      if (~~(Math.random() * 250) == 1)
        this.deathstar.laser = 15 + ~~(Math.random() * 25);
      this.ctx.drawImage(this.deathstar.image, this.deathstar.x, this.deathstar.y);
      // Laser
      this.deathstar.draw(this.ctx);
    }
    // Alle Gebäude zeichnen
    this.buildings.forEach((building) => {
      //building.draw(this.ctx);  // Verwende die `draw`-Methode der Gebäude
      building.drawComplete(this.ctx); // Verwende die `draw`-Methode der Gebäude
    });

    if (!this.isGameRunning) {
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillStyle = '#bebebe';
      this.ctx.fillRect(
        0,
        0,
        this.gameCanvas.nativeElement.width,
        this.gameCanvas.nativeElement.height,
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: any): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  onCanvasClick(event: MouseEvent) {
    this.music.play();
    const canvas = this.gameCanvas.nativeElement;
    const rect = this.gameCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Platzieren eines Gebäudes, wenn ein Gebäudetyp ausgewählt ist
    if (this.selectedBuildingType !== null) {
      const position = new Vector2D(x, y);
      if (this.selectedBuildingType !== null) {
        canvas.style.cursor = 'auto';
        this.gameBar.resetSelectionAndHighlight();
        const newBuilding = this.gameManager.createBuilding(
          this.selectedBuildingType,
          position,
        );
        if (newBuilding) {
          this.buildings.push(newBuilding); // Neues Gebäude zur Liste hinzufügen
        }
        this.selectedBuildingType = null; // Setze den ausgewählten Gebäudetyp zurück
      }
    } else {
      // Überprüfen, ob ein Gebäude angeklickt wurde
      for (let i = 0; i < this.buildings.length; i++) {
        const building = this.buildings[i];
        if (building.isClicked(new Vector2D(x, y))) {
          building.isSelected = true;
        } else {
          building.isSelected = false;
        }
      }
    }
  }

  public pauseGame(): void {
    this.isGameRunning = false;
  }

  public continueGame(): void {
    this.isGameRunning = true;
  }

  @HostListener('document:keydown', ['$event'])
  private onKeyPressed(event: any): void {
    switch (event.key) {
      case 'Escape':
        if (this.isGameRunning) this.pauseGame();
        else this.continueGame();
        break;
      default:
        break;
    }
  }
}
