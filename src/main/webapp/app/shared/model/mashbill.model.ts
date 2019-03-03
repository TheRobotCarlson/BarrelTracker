import { IMashbillGrain } from 'app/shared/model//mashbill-grain.model';
import { IMashbillYeast } from 'app/shared/model//mashbill-yeast.model';

export interface IMashbill {
    id?: number;
    mashbillName?: string;
    mashbillCode?: string;
    mashbillNotes?: string;
    mashbillGrains?: IMashbillGrain[];
    mashbillYeasts?: IMashbillYeast[];
}

export class Mashbill implements IMashbill {
    constructor(
        public id?: number,
        public mashbillName?: string,
        public mashbillCode?: string,
        public mashbillNotes?: string,
        public mashbillGrains?: IMashbillGrain[],
        public mashbillYeasts?: IMashbillYeast[]
    ) {}
}
