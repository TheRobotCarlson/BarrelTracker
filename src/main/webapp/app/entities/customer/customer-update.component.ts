import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';

@Component({
    selector: 'jhi-customer-update',
    templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {
    private _customer: ICustomer;
    isSaving: boolean;

    constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>) {
        result.subscribe((res: HttpResponse<ICustomer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get customer() {
        return this._customer;
    }

    set customer(customer: ICustomer) {
        this._customer = customer;
    }
}
