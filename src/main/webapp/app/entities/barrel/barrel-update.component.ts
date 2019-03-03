import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBarrel } from 'app/shared/model/barrel.model';
import { BarrelService } from './barrel.service';
import { ILot } from 'app/shared/model/lot.model';
import { LotService } from 'app/entities/lot';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from 'app/entities/batch';

@Component({
    selector: 'jhi-barrel-update',
    templateUrl: './barrel-update.component.html'
})
export class BarrelUpdateComponent implements OnInit {
    private _barrel: IBarrel;
    isSaving: boolean;

    lots: ILot[];

    customers: ICustomer[];

    batches: IBatch[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private barrelService: BarrelService,
        private lotService: LotService,
        private customerService: CustomerService,
        private batchService: BatchService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ barrel }) => {
            this.barrel = barrel;
        });
        this.lotService.query().subscribe(
            (res: HttpResponse<ILot[]>) => {
                this.lots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.batchService.query().subscribe(
            (res: HttpResponse<IBatch[]>) => {
                this.batches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.barrel.id !== undefined) {
            this.subscribeToSaveResponse(this.barrelService.update(this.barrel));
        } else {
            this.subscribeToSaveResponse(this.barrelService.create(this.barrel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBarrel>>) {
        result.subscribe((res: HttpResponse<IBarrel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLotById(index: number, item: ILot) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }

    trackBatchById(index: number, item: IBatch) {
        return item.id;
    }
    get barrel() {
        return this._barrel;
    }

    set barrel(barrel: IBarrel) {
        this._barrel = barrel;
    }
}
