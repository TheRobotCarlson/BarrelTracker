import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Barrel } from 'app/shared/model/barrel.model';
import { BarrelService } from './barrel.service';
import { BarrelComponent } from './barrel.component';
import { BarrelDetailComponent } from './barrel-detail.component';
import { BarrelUpdateComponent } from './barrel-update.component';
import { BarrelDeletePopupComponent } from './barrel-delete-dialog.component';
import { IBarrel } from 'app/shared/model/barrel.model';

@Injectable({ providedIn: 'root' })
export class BarrelResolve implements Resolve<IBarrel> {
    constructor(private service: BarrelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((barrel: HttpResponse<Barrel>) => barrel.body);
        }
        return Observable.of(new Barrel());
    }
}

export const barrelRoute: Routes = [
    {
        path: 'barrel',
        component: BarrelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Barrels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'barrel/:id/view',
        component: BarrelDetailComponent,
        resolve: {
            barrel: BarrelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Barrels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'barrel/new',
        component: BarrelUpdateComponent,
        resolve: {
            barrel: BarrelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Barrels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'barrel/:id/edit',
        component: BarrelUpdateComponent,
        resolve: {
            barrel: BarrelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Barrels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const barrelPopupRoute: Routes = [
    {
        path: 'barrel/:id/delete',
        component: BarrelDeletePopupComponent,
        resolve: {
            barrel: BarrelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Barrels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
