import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGrain } from 'app/shared/model/grain.model';
import { GrainService } from './grain.service';

@Component({
    selector: 'jhi-grain-update',
    templateUrl: './grain-update.component.html'
})
export class GrainUpdateComponent implements OnInit {
    private _grain: IGrain;
    isSaving: boolean;

    constructor(private grainService: GrainService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ grain }) => {
            this.grain = grain;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.grain.id !== undefined) {
            this.subscribeToSaveResponse(this.grainService.update(this.grain));
        } else {
            this.subscribeToSaveResponse(this.grainService.create(this.grain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGrain>>) {
        result.subscribe((res: HttpResponse<IGrain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get grain() {
        return this._grain;
    }

    set grain(grain: IGrain) {
        this._grain = grain;
    }
}
