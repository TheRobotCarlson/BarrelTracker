import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { MashbillYeastService } from './mashbill-yeast.service';
import { IYeast } from 'app/shared/model/yeast.model';
import { YeastService } from 'app/entities/yeast';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';

@Component({
    selector: 'jhi-mashbill-yeast-update',
    templateUrl: './mashbill-yeast-update.component.html'
})
export class MashbillYeastUpdateComponent implements OnInit {
    private _mashbillYeast: IMashbillYeast;
    isSaving: boolean;

    yeasts: IYeast[];

    mashbills: IMashbill[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mashbillYeastService: MashbillYeastService,
        private yeastService: YeastService,
        private mashbillService: MashbillService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbillYeast }) => {
            this.mashbillYeast = mashbillYeast;
        });
        this.yeastService.query().subscribe(
            (res: HttpResponse<IYeast[]>) => {
                this.yeasts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mashbillService.query().subscribe(
            (res: HttpResponse<IMashbill[]>) => {
                this.mashbills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mashbillYeast.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillYeastService.update(this.mashbillYeast));
        } else {
            this.subscribeToSaveResponse(this.mashbillYeastService.create(this.mashbillYeast));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMashbillYeast>>) {
        result.subscribe((res: HttpResponse<IMashbillYeast>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackYeastById(index: number, item: IYeast) {
        return item.id;
    }

    trackMashbillById(index: number, item: IMashbill) {
        return item.id;
    }
    get mashbillYeast() {
        return this._mashbillYeast;
    }

    set mashbillYeast(mashbillYeast: IMashbillYeast) {
        this._mashbillYeast = mashbillYeast;
    }
}
