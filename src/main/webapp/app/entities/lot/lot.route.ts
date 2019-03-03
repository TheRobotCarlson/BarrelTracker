import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Lot } from 'app/shared/model/lot.model';
import { LotService } from './lot.service';
import { LotComponent } from './lot.component';
import { LotDetailComponent } from './lot-detail.component';
import { LotUpdateComponent } from './lot-update.component';
import { LotDeletePopupComponent } from './lot-delete-dialog.component';
import { ILot } from 'app/shared/model/lot.model';

@Injectable({ providedIn: 'root' })
export class LotResolve implements Resolve<ILot> {
    constructor(private service: LotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((lot: HttpResponse<Lot>) => lot.body);
        }
        return Observable.of(new Lot());
    }
}

export const lotRoute: Routes = [
    {
        path: 'lot',
        component: LotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lots'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lot/:id/view',
        component: LotDetailComponent,
        resolve: {
            lot: LotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lots'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lot/new',
        component: LotUpdateComponent,
        resolve: {
            lot: LotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lots'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lot/:id/edit',
        component: LotUpdateComponent,
        resolve: {
            lot: LotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lots'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lotPopupRoute: Routes = [
    {
        path: 'lot/:id/delete',
        component: LotDeletePopupComponent,
        resolve: {
            lot: LotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lots'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
