import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Grain } from 'app/shared/model/grain.model';
import { GrainService } from './grain.service';
import { GrainComponent } from './grain.component';
import { GrainDetailComponent } from './grain-detail.component';
import { GrainUpdateComponent } from './grain-update.component';
import { GrainDeletePopupComponent } from './grain-delete-dialog.component';
import { IGrain } from 'app/shared/model/grain.model';

@Injectable({ providedIn: 'root' })
export class GrainResolve implements Resolve<IGrain> {
    constructor(private service: GrainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((grain: HttpResponse<Grain>) => grain.body);
        }
        return Observable.of(new Grain());
    }
}

export const grainRoute: Routes = [
    {
        path: 'grain',
        component: GrainComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'grain/:id/view',
        component: GrainDetailComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'grain/new',
        component: GrainUpdateComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'grain/:id/edit',
        component: GrainUpdateComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grains'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const grainPopupRoute: Routes = [
    {
        path: 'grain/:id/delete',
        component: GrainDeletePopupComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grains'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
