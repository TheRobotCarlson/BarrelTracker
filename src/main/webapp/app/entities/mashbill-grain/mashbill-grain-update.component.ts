import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from './mashbill-grain.service';
import { IGrain } from 'app/shared/model/grain.model';
import { GrainService } from 'app/entities/grain';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';

@Component({
    selector: 'jhi-mashbill-grain-update',
    templateUrl: './mashbill-grain-update.component.html'
})
export class MashbillGrainUpdateComponent implements OnInit {
    private _mashbillGrain: IMashbillGrain;
    isSaving: boolean;

    grains: IGrain[];

    mashbills: IMashbill[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mashbillGrainService: MashbillGrainService,
        private grainService: GrainService,
        private mashbillService: MashbillService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbillGrain }) => {
            this.mashbillGrain = mashbillGrain;
        });
        this.grainService.query().subscribe(
            (res: HttpResponse<IGrain[]>) => {
                this.grains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mashbillService.query().subscribe(
            (res: HttpResponse<IMashbill[]>) => {
                this.mashbills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mashbillGrain.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillGrainService.update(this.mashbillGrain));
        } else {
            this.subscribeToSaveResponse(this.mashbillGrainService.create(this.mashbillGrain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMashbillGrain>>) {
        result.subscribe((res: HttpResponse<IMashbillGrain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGrainById(index: number, item: IGrain) {
        return item.id;
    }

    trackMashbillById(index: number, item: IMashbill) {
        return item.id;
    }
    get mashbillGrain() {
        return this._mashbillGrain;
    }

    set mashbillGrain(mashbillGrain: IMashbillGrain) {
        this._mashbillGrain = mashbillGrain;
    }
}
