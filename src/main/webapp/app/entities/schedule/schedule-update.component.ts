import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-schedule-update',
    templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
    private _schedule: ISchedule;
    isSaving: boolean;

    mashbills: IMashbill[];

    customers: ICustomer[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private scheduleService: ScheduleService,
        private mashbillService: MashbillService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
        });
        this.mashbillService.query().subscribe(
            (res: HttpResponse<IMashbill[]>) => {
                this.mashbills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.schedule.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(this.scheduleService.create(this.schedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>) {
        result.subscribe((res: HttpResponse<ISchedule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
    get schedule() {
        return this._schedule;
    }

    set schedule(schedule: ISchedule) {
        this._schedule = schedule;
        this.date = moment(schedule.date).format(DATE_TIME_FORMAT);
    }
}
