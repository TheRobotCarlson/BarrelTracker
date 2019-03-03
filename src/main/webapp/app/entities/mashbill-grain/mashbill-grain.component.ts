import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { Principal } from 'app/core';
import { MashbillGrainService } from './mashbill-grain.service';

@Component({
    selector: 'jhi-mashbill-grain',
    templateUrl: './mashbill-grain.component.html'
})
export class MashbillGrainComponent implements OnInit, OnDestroy {
    mashbillGrains: IMashbillGrain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mashbillGrainService: MashbillGrainService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mashbillGrainService.query().subscribe(
            (res: HttpResponse<IMashbillGrain[]>) => {
                this.mashbillGrains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMashbillGrains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMashbillGrain) {
        return item.id;
    }

    registerChangeInMashbillGrains() {
        this.eventSubscriber = this.eventManager.subscribe('mashbillGrainListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
