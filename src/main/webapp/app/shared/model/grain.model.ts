export interface IGrain {
    id?: number;
    grainName?: string;
}

export class Grain implements IGrain {
    constructor(public id?: number, public grainName?: string) {}
}
