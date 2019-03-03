import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Schedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { ScheduleUpdateComponent } from './schedule-update.component';
import { ScheduleDeletePopupComponent } from './schedule-delete-dialog.component';
import { ISchedule } from 'app/shared/model/schedule.model';

@Injectable({ providedIn: 'root' })
export class ScheduleResolve implements Resolve<ISchedule> {
    constructor(private service: ScheduleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((schedule: HttpResponse<Schedule>) => schedule.body);
        }
        return Observable.of(new Schedule());
    }
}

export const scheduleRoute: Routes = [
    {
        path: 'schedule',
        component: ScheduleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule/:id/view',
        component: ScheduleDetailComponent,
        resolve: {
            schedule: ScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule/new',
        component: ScheduleUpdateComponent,
        resolve: {
            schedule: ScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule/:id/edit',
        component: ScheduleUpdateComponent,
        resolve: {
            schedule: ScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schedulePopupRoute: Routes = [
    {
        path: 'schedule/:id/delete',
        component: ScheduleDeletePopupComponent,
        resolve: {
            schedule: ScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Schedules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
