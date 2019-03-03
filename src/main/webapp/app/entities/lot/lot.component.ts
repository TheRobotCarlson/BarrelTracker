import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILot } from 'app/shared/model/lot.model';
import { Principal } from 'app/core';
import { LotService } from './lot.service';

@Component({
    selector: 'jhi-lot',
    templateUrl: './lot.component.html'
})
export class LotComponent implements OnInit, OnDestroy {
    lots: ILot[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lotService: LotService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.lotService.query().subscribe(
            (res: HttpResponse<ILot[]>) => {
                this.lots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILot) {
        return item.id;
    }

    registerChangeInLots() {
        this.eventSubscriber = this.eventManager.subscribe('lotListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
