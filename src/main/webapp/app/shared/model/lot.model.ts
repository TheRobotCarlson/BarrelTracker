import { IBarrel } from 'app/shared/model//barrel.model';

export interface ILot {
    id?: number;
    barrelCapacity?: number;
    lotName?: string;
    location?: string;
    barrels?: IBarrel[];
}

export class Lot implements ILot {
    constructor(
        public id?: number,
        public barrelCapacity?: number,
        public lotName?: string,
        public location?: string,
        public barrels?: IBarrel[]
    ) {}
}
