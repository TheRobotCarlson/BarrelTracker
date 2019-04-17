import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMashbill } from 'app/shared/model/mashbill.model';
import { IGrain } from 'app/shared/model/grain.model';
import { MashbillService } from './mashbill.service';
import { GrainService } from '../grain';
import { IMashbillGrain, MashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from '../mashbill-grain/mashbill-grain.service';
import { MashbillYeastService } from '../mashbill-yeast/mashbill-yeast.service';
import { mashbillGrainPopupRoute } from '../mashbill-grain';
import { IMashbillYeast, MashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { IYeast } from 'app/shared/model/yeast.model';
import { YeastService } from '../yeast';

@Component({
    selector: 'jhi-mashbill-update',
    templateUrl: './mashbill-update.component.html'
})
export class MashbillUpdateComponent implements OnInit {
    private _mashbill: IMashbill;
    private _mashbillGrain: IMashbillGrain;

    isSaving: boolean;
    mbgs = new Array<MashbillGrain>();
    mbys = new Array<MashbillYeast>();

    grains: IGrain[];
    yeasts: IYeast[];

    constructor(
        private mashbillService: MashbillService,
        private activatedRoute: ActivatedRoute,
        private grainService: GrainService,
        private yeastService: YeastService,
        private jhiAlertService: JhiAlertService,
        private mashbillGrainService: MashbillGrainService,
        private mashbillYeastService: MashbillYeastService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
        // this.mbgs.push(new MashbillGrain());
        // this.mbys.push(new MashbillYeast());

        this.activatedRoute.data.subscribe(({ mashbillGrain }) => {
            this.mashbillGrain = mashbillGrain;
        });
        this.grainService.query().subscribe(
            (res: HttpResponse<IGrain[]>) => {
                this.grains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.yeastService.query().subscribe(
            (res: HttpResponse<IYeast[]>) => {
                this.yeasts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        console.log('Hello World!');
        //console.log(this.grains[0].grainName);
    }

    previousState() {
        window.history.back();
    }

    loadMashbill() {
        this.mashbillService.queryByName(this.mashbill.mashbillName).subscribe(resp => {
            console.log(resp);
            this.mashbill = resp;
        });
    }

    save() {
        this.isSaving = true;
        if (this.mashbill.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillService.update(this.mashbill));
        } else {
            this.subscribeToSaveResponse(this.mashbillService.create(this.mashbill));
            for (let entry of this.mbgs) {
                entry.mashbill = this.mashbill;
                console.log('ENTRY: ');
                console.log(entry);
                this.mbgSubscribeToSaveResponse(this.mashbillGrainService.createWithMashbill(entry));
            }

            for (let entry of this.mbys) {
                entry.mashbill = this.mashbill;
                this.mbySubscriveToSaveResponse(this.mashbillYeastService.createWithMashbill(entry));
            }
        }
        this.previousState();
    }

    private mbySubscriveToSaveResponse(result: Observable<HttpResponse<IMashbillYeast>>) {
        result.subscribe((res: HttpResponse<IMashbillYeast>) => this.onMBYSaveSuccess(), (res: HttpErrorResponse) => this.onMBYSaveError());
    }

    private mbgSubscribeToSaveResponse(result: Observable<HttpResponse<IMashbillGrain>>) {
        result.subscribe((res: HttpResponse<IMashbillGrain>) => this.onMBGSaveSuccess(), (res: HttpErrorResponse) => this.onMBGSaveError());
    }

    private onMBGSaveSuccess() {
        console.log('New Mashbill Grain Saved successfully');
    }

    private onMBGSaveError() {
        console.log('New Mashbill Grain NOT Saved');
    }

    private onMBYSaveSuccess() {
        console.log('New Mashbill Yeast Saved successfully');
    }

    private onMBYSaveError() {
        console.log('New Mashbill Yeast NOT Saved');
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMashbill>>) {
        console.log(result);
        result.subscribe((res: HttpResponse<IMashbill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        console.log(errorMessage);
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGrainById(index: number, item: IGrain) {
        return item.id;
    }

    trackYeastById(index: number, item: IYeast) {
        return item.id;
    }

    trackYeastByName(index: number, item: IYeast) {
        return item.yeastName;
    }

    addGrain() {
        console.log('Pre push: ');
        for (let x of this.mbgs) {
            console.log(x.grain);
        }
        this.mbgs.push(new MashbillGrain());
        console.log('Post push: ');
        for (let x of this.mbgs) {
            console.log(x.grain);
        }
    }

    addYeast() {
        this.mbys.push(new MashbillYeast());
    }

    get mashbill() {
        return this._mashbill;
    }

    set mashbill(mashbill: IMashbill) {
        this._mashbill = mashbill;
    }

    get mashbillGrain() {
        return this._mashbillGrain;
    }

    set mashbillGrain(mbg: IMashbillGrain) {
        this._mashbillGrain = mbg;
    }
}
