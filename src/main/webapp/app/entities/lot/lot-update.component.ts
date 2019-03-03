import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILot } from 'app/shared/model/lot.model';
import { LotService } from './lot.service';

@Component({
    selector: 'jhi-lot-update',
    templateUrl: './lot-update.component.html'
})
export class LotUpdateComponent implements OnInit {
    private _lot: ILot;
    isSaving: boolean;

    constructor(private lotService: LotService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lot }) => {
            this.lot = lot;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.lot.id !== undefined) {
            this.subscribeToSaveResponse(this.lotService.update(this.lot));
        } else {
            this.subscribeToSaveResponse(this.lotService.create(this.lot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILot>>) {
        result.subscribe((res: HttpResponse<ILot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get lot() {
        return this._lot;
    }

    set lot(lot: ILot) {
        this._lot = lot;
    }
}
