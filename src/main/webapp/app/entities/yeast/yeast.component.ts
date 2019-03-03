import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IYeast } from 'app/shared/model/yeast.model';
import { Principal } from 'app/core';
import { YeastService } from './yeast.service';

@Component({
    selector: 'jhi-yeast',
    templateUrl: './yeast.component.html'
})
export class YeastComponent implements OnInit, OnDestroy {
    yeasts: IYeast[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private yeastService: YeastService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.yeastService.query().subscribe(
            (res: HttpResponse<IYeast[]>) => {
                this.yeasts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInYeasts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IYeast) {
        return item.id;
    }

    registerChangeInYeasts() {
        this.eventSubscriber = this.eventManager.subscribe('yeastListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
