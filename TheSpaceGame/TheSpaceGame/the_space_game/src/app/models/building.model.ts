import { Vector2D } from "./vector2d.model";

export abstract class Building {
    public isSelected: boolean = false;

    constructor(
        public buildCosts: number,
        public damagePoints: number,
        public level: number,
        public position: Vector2D,
        public health: number,
        public width: number,
        public height: number
    ) { }

    abstract draw(ctx: CanvasRenderingContext2D): void;

    drawComplete(ctx: CanvasRenderingContext2D): void {
        this.draw(ctx);
        if (this.isSelected) {
            this.#drawSelectedFrame(ctx);
        }
    }

    #drawSelectedFrame(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);

        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        ctx.setLineDash([]);
    }

    isClicked(clickPosition: Vector2D): boolean {
        return clickPosition.x >= this.position.x &&
               clickPosition.x <= this.position.x + this.width &&
               clickPosition.y >= this.position.y &&
               clickPosition.y <= this.position.y + this.height;
      }
}