import { IYeast } from 'app/shared/model//yeast.model';
import { IMashbill } from 'app/shared/model//mashbill.model';

export interface IMashbillYeast {
    id?: number;
    quantity?: number;
    yeast?: IYeast;
    mashbill?: IMashbill;
}

export class MashbillYeast implements IMashbillYeast {
    constructor(public id?: number, public quantity?: number, public yeast?: IYeast, public mashbill?: IMashbill) {}
}
