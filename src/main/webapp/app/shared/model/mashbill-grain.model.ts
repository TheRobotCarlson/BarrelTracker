import { IGrain } from 'app/shared/model//grain.model';
import { IMashbill } from 'app/shared/model//mashbill.model';

export interface IMashbillGrain {
    id?: number;
    quantity?: number;
    grain?: IGrain;
    mashbill?: IMashbill;
}

export class MashbillGrain implements IMashbillGrain {
    constructor(public id?: number, public quantity?: number, public grain?: IGrain, public mashbill?: IMashbill) {}
}
