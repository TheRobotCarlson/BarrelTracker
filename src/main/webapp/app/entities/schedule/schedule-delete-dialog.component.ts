import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'jhi-schedule-delete-dialog',
    templateUrl: './schedule-delete-dialog.component.html'
})
export class ScheduleDeleteDialogComponent {
    schedule: ISchedule;

    constructor(private scheduleService: ScheduleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scheduleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'scheduleListModification',
                content: 'Deleted an schedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-schedule-delete-popup',
    template: ''
})
export class ScheduleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schedule }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ScheduleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.schedule = schedule;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
