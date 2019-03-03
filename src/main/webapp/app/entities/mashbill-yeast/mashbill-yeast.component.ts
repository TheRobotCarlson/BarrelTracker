import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { Principal } from 'app/core';
import { MashbillYeastService } from './mashbill-yeast.service';

@Component({
    selector: 'jhi-mashbill-yeast',
    templateUrl: './mashbill-yeast.component.html'
})
export class MashbillYeastComponent implements OnInit, OnDestroy {
    mashbillYeasts: IMashbillYeast[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mashbillYeastService: MashbillYeastService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mashbillYeastService.query().subscribe(
            (res: HttpResponse<IMashbillYeast[]>) => {
                this.mashbillYeasts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMashbillYeasts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMashbillYeast) {
        return item.id;
    }

    registerChangeInMashbillYeasts() {
        this.eventSubscriber = this.eventManager.subscribe('mashbillYeastListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
