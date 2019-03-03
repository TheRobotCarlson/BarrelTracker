import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IYeast } from 'app/shared/model/yeast.model';
import { YeastService } from './yeast.service';

@Component({
    selector: 'jhi-yeast-update',
    templateUrl: './yeast-update.component.html'
})
export class YeastUpdateComponent implements OnInit {
    private _yeast: IYeast;
    isSaving: boolean;

    constructor(private yeastService: YeastService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ yeast }) => {
            this.yeast = yeast;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.yeast.id !== undefined) {
            this.subscribeToSaveResponse(this.yeastService.update(this.yeast));
        } else {
            this.subscribeToSaveResponse(this.yeastService.create(this.yeast));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IYeast>>) {
        result.subscribe((res: HttpResponse<IYeast>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get yeast() {
        return this._yeast;
    }

    set yeast(yeast: IYeast) {
        this._yeast = yeast;
    }
}
