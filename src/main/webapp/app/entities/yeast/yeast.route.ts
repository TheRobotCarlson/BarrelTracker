import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Yeast } from 'app/shared/model/yeast.model';
import { YeastService } from './yeast.service';
import { YeastComponent } from './yeast.component';
import { YeastDetailComponent } from './yeast-detail.component';
import { YeastUpdateComponent } from './yeast-update.component';
import { YeastDeletePopupComponent } from './yeast-delete-dialog.component';
import { IYeast } from 'app/shared/model/yeast.model';

@Injectable({ providedIn: 'root' })
export class YeastResolve implements Resolve<IYeast> {
    constructor(private service: YeastService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((yeast: HttpResponse<Yeast>) => yeast.body);
        }
        return Observable.of(new Yeast());
    }
}

export const yeastRoute: Routes = [
    {
        path: 'yeast',
        component: YeastComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Yeasts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'yeast/:id/view',
        component: YeastDetailComponent,
        resolve: {
            yeast: YeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Yeasts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'yeast/new',
        component: YeastUpdateComponent,
        resolve: {
            yeast: YeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Yeasts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'yeast/:id/edit',
        component: YeastUpdateComponent,
        resolve: {
            yeast: YeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Yeasts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yeastPopupRoute: Routes = [
    {
        path: 'yeast/:id/delete',
        component: YeastDeletePopupComponent,
        resolve: {
            yeast: YeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Yeasts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
