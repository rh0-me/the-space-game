import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EconomyService{

    constructor() {
        
    }

    public energy: number = 0;
    public minerals: number = 0;

    public produceEnergy(amount: number): void {
        this.energy += amount;
    }

    public consumeEnergy(amount: number): boolean {
        if (this.energy >= amount) {
            this.energy -= amount;
            return true;
        }
        return false;
    }

    public addMinerals(amount: number): void {
        this.minerals += amount;
    }

    public consumeMinerals(amount: number): boolean {
        if (this.minerals >= amount) {
            this.minerals -= amount;
            return true;
        }
        return false;
    }

    public getEnergy(): number {
        return this.energy;
    }

    public getMinerals(): number {
        return this.minerals;
    }

}
