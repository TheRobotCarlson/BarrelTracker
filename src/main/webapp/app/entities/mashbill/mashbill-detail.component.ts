import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMashbill, Mashbill } from 'app/shared/model/mashbill.model';
import { IMashbillGrain, MashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { MashbillGrainService } from '../mashbill-grain/mashbill-grain.service';
import { MashbillYeastService } from '../mashbill-yeast';

@Component({
    selector: 'jhi-mashbill-detail',
    templateUrl: './mashbill-detail.component.html'
})
export class MashbillDetailComponent implements OnInit {
    mashbill: IMashbill;
    grains: IMashbillGrain[];
    yeasts: IMashbillYeast[];
    g: IMashbillGrain;

    constructor(
        private activatedRoute: ActivatedRoute,
        private grainService: MashbillGrainService,
        private yeastService: MashbillYeastService
    ) {}

    loadAllGrains() {
        this.grainService.queryByOwner(this.mashbill.id).subscribe(resp => {
            console.log(resp);
            this.grains = resp;
        });
    }

    loadAllYeasts() {
        this.yeastService.queryByOwner(this.mashbill.id).subscribe(resp => {
            console.log(resp);
            this.yeasts = resp;
        });
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
        this.loadAllGrains();
        this.loadAllYeasts();
    }

    previousState() {
        window.history.back();
    }

    trackId(index: number, item: IMashbillGrain) {
        return item.id;
    }
}
