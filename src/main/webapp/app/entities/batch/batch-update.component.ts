import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';

@Component({
    selector: 'jhi-batch-update',
    templateUrl: './batch-update.component.html'
})
export class BatchUpdateComponent implements OnInit {
    private _batch: IBatch;
    isSaving: boolean;

    mashbills: IMashbill[];

    schedules: ISchedule[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private batchService: BatchService,
        private mashbillService: MashbillService,
        private scheduleService: ScheduleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ batch }) => {
            this.batch = batch;
        });
        this.mashbillService.query().subscribe(
            (res: HttpResponse<IMashbill[]>) => {
                this.mashbills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.batch.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.batch.id !== undefined) {
            this.subscribeToSaveResponse(this.batchService.update(this.batch));
        } else {
            this.subscribeToSaveResponse(this.batchService.create(this.batch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBatch>>) {
        result.subscribe((res: HttpResponse<IBatch>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMashbillById(index: number, item: IMashbill) {
        return item.id;
    }

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }
    get batch() {
        return this._batch;
    }

    set batch(batch: IBatch) {
        this._batch = batch;
        this.date = moment(batch.date).format(DATE_TIME_FORMAT);
    }
}
