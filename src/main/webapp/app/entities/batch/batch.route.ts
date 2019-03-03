import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Batch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { BatchComponent } from './batch.component';
import { BatchDetailComponent } from './batch-detail.component';
import { BatchUpdateComponent } from './batch-update.component';
import { BatchDeletePopupComponent } from './batch-delete-dialog.component';
import { IBatch } from 'app/shared/model/batch.model';

@Injectable({ providedIn: 'root' })
export class BatchResolve implements Resolve<IBatch> {
    constructor(private service: BatchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((batch: HttpResponse<Batch>) => batch.body);
        }
        return Observable.of(new Batch());
    }
}

export const batchRoute: Routes = [
    {
        path: 'batch',
        component: BatchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'batch/:id/view',
        component: BatchDetailComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'batch/new',
        component: BatchUpdateComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'batch/:id/edit',
        component: BatchUpdateComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const batchPopupRoute: Routes = [
    {
        path: 'batch/:id/delete',
        component: BatchDeletePopupComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
