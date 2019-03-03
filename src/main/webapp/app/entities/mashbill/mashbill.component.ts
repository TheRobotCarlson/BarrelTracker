import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMashbill } from 'app/shared/model/mashbill.model';
import { Principal } from 'app/core';
import { MashbillService } from './mashbill.service';

@Component({
    selector: 'jhi-mashbill',
    templateUrl: './mashbill.component.html'
})
export class MashbillComponent implements OnInit, OnDestroy {
    mashbills: IMashbill[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mashbillService: MashbillService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mashbillService.query().subscribe(
            (res: HttpResponse<IMashbill[]>) => {
                this.mashbills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMashbills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMashbill) {
        return item.id;
    }

    registerChangeInMashbills() {
        this.eventSubscriber = this.eventManager.subscribe('mashbillListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
