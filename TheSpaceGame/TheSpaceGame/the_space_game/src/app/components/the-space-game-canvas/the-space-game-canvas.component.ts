import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Buildings } from 'src/app/enums/buildings.enum';
import { Building } from 'src/app/models/building.model';
import { Reactor } from 'src/app/models/reactor.model';
import { Vector2D } from 'src/app/models/vector2d.model';
import { GameManagerService } from 'src/app/services/game-manager.service';

@Component({
    selector: 'game-canvas',
    templateUrl: './the-space-game-canvas.component.html',
    styleUrls: ['./the-space-game-canvas.component.css']
})
export class TheSpaceGameCanvasComponent implements OnInit {
    Buildings = Buildings;
    @ViewChild('canvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
 
    private isGameRunning: boolean = true; // TODO Auslagern in Game-Service

    public innerWidth: any;
    public innerHeight: any;

    private speed: number = 5;
    private rectX: number = 50;
    private rectY: number = 50;

    private keys: { [key: string]: boolean } = {};

    public buildings: Building[] = [new Reactor(new Vector2D(100, 100))];  // Liste der Gebäude auf dem Spielfeld

    private selectedBuildingType: Buildings | null = null;

    public ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
    }

    constructor(private gameManager: GameManagerService) { }

    /**
     * Einmaliges Initialisieren des Contextes und Starten des Game-Loops
     */
    public ngAfterViewInit(): void {
        this.ctx = this.gameCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
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
        this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
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
        if (this.keys['w'] && this.#checkLegalMove(this.rectX, this.rectY - this.speed)) {
            this.rectY -= this.speed; // W - nach oben
        }
        if (this.keys['s'] && this.#checkLegalMove(this.rectX, this.rectY + this.speed)) {
            this.rectY += this.speed; // S - nach unten
        }
        if (this.keys['a'] && this.#checkLegalMove(this.rectX - this.speed, this.rectY)) {
            this.rectX -= this.speed; // A - nach links
        }
        if (this.keys['d'] && this.#checkLegalMove(this.rectX + this.speed, this.rectY)) {
            this.rectX += this.speed; // D - nach rechts
        }
    }

    selectBuilding(buildingType: Buildings): void {
        this.selectedBuildingType = buildingType;  // Setzt den aktuellen Gebäudetyp
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
        this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
        this.ctx.globalAlpha = 1.0;
        // Hintergrund des Spielfelds zeichnen (optional: Bild oder Farbe)
        this.ctx.fillStyle = '#000';  // Schwarzer Hintergrund für das Spielfeld
        this.ctx.fillRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);

        // Alle Gebäude zeichnen
        this.buildings.forEach(building => {
            //building.draw(this.ctx);  // Verwende die `draw`-Methode der Gebäude
            building.drawComplete(this.ctx);  // Verwende die `draw`-Methode der Gebäude
        });

        if (!this.isGameRunning) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillStyle = "#bebebe";
            this.ctx.fillRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height )   
        }
    }




    @HostListener('window:resize', ['$event'])
    private onResize(event: any): void {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
    }


    onCanvasClick(event: MouseEvent) {

        const rect = this.gameCanvas.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Platzieren eines Gebäudes, wenn ein Gebäudetyp ausgewählt ist
        if (this.selectedBuildingType !== null) {
            
            const position = new Vector2D(x, y);
            if (this.selectedBuildingType !== null) {
                const newBuilding = this.gameManager.createBuilding(this.selectedBuildingType, position);
                if (newBuilding) {
                    this.buildings.push(newBuilding);  // Neues Gebäude zur Liste hinzufügen
                }
                this.selectedBuildingType = null;  // Setze den ausgewählten Gebäudetyp zurück
            }
        } else {
            // Überprüfen, ob ein Gebäude angeklickt wurde
            for (let i = 0; i < this.buildings.length; i++) {
                const building = this.buildings[i];
                if (building.isClicked(new Vector2D(x, y))) {
                    building.isSelected = true;
                }else{
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
                if (this.isGameRunning)
                    this.pauseGame();
                else
                    this.continueGame();
                break;
            default:

                break;
        }

    }



}
