import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBatch } from 'app/shared/model/batch.model';
import { Principal } from 'app/core';
import { BatchService } from './batch.service';

@Component({
    selector: 'jhi-batch',
    templateUrl: './batch.component.html'
})
export class BatchComponent implements OnInit, OnDestroy {
    batches: IBatch[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private batchService: BatchService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.batchService.query().subscribe(
            (res: HttpResponse<IBatch[]>) => {
                this.batches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBatches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBatch) {
        return item.id;
    }

    registerChangeInBatches() {
        this.eventSubscriber = this.eventManager.subscribe('batchListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
