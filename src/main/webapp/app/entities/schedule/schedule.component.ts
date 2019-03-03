import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISchedule } from 'app/shared/model/schedule.model';
import { Principal } from 'app/core';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'jhi-schedule',
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
    schedules: ISchedule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scheduleService: ScheduleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISchedule) {
        return item.id;
    }

    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
