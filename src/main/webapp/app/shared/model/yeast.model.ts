export interface IYeast {
    id?: number;
    yeastName?: string;
    yeastCode?: string;
}

export class Yeast implements IYeast {
    constructor(public id?: number, public yeastName?: string, public yeastCode?: string) {}
}
