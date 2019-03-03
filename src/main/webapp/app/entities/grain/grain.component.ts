import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGrain } from 'app/shared/model/grain.model';
import { Principal } from 'app/core';
import { GrainService } from './grain.service';

@Component({
    selector: 'jhi-grain',
    templateUrl: './grain.component.html'
})
export class GrainComponent implements OnInit, OnDestroy {
    grains: IGrain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private grainService: GrainService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.grainService.query().subscribe(
            (res: HttpResponse<IGrain[]>) => {
                this.grains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGrains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGrain) {
        return item.id;
    }

    registerChangeInGrains() {
        this.eventSubscriber = this.eventManager.subscribe('grainListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
