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
import { mashbillGrainPopupRoute } from '../mashbill-grain';

@Component({
    selector: 'jhi-mashbill-update',
    templateUrl: './mashbill-update.component.html'
})
export class MashbillUpdateComponent implements OnInit {
    private _mashbill: IMashbill;
    private _mashbillGrain: IMashbillGrain;
    isSaving: boolean;
    mbgs = new Array<MashbillGrain>();

    grains: IGrain[];

    constructor(
        private mashbillService: MashbillService,
        private activatedRoute: ActivatedRoute,
        private grainService: GrainService,
        private jhiAlertService: JhiAlertService,
        private mashbillGrainService: MashbillGrainService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
        this.mbgs.push(new MashbillGrain());

        this.activatedRoute.data.subscribe(({ mashbillGrain }) => {
            this.mashbillGrain = mashbillGrain;
        });
        this.grainService.query().subscribe(
            (res: HttpResponse<IGrain[]>) => {
                this.grains = res.body;
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
            this.loadMashbill();
            console.log('NEW INFO: ');
            console.log(this.mashbill.mashbillName);
            console.log(this.mashbill.id);
            console.log('END OF NEW INFO');
            for (let entry of this.mbgs) {
                entry.mashbill = this.mashbill;
                console.log('ENTRY: ');
                console.log(entry);
                this.mbgSubscribeToSaveResponse(this.mashbillGrainService.create(entry));
            }
        }
        this.previousState();
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

    addRow() {
        this.mbgs.push(new MashbillGrain());
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
