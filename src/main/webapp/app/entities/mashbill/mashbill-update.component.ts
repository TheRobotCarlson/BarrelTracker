import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from './mashbill.service';

@Component({
    selector: 'jhi-mashbill-update',
    templateUrl: './mashbill-update.component.html'
})
export class MashbillUpdateComponent implements OnInit {
    private _mashbill: IMashbill;
    isSaving: boolean;

    constructor(private mashbillService: MashbillService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mashbill.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillService.update(this.mashbill));
        } else {
            this.subscribeToSaveResponse(this.mashbillService.create(this.mashbill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMashbill>>) {
        result.subscribe((res: HttpResponse<IMashbill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get mashbill() {
        return this._mashbill;
    }

    set mashbill(mashbill: IMashbill) {
        this._mashbill = mashbill;
    }
}
