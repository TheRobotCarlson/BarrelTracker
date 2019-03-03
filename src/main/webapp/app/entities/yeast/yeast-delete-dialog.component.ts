import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IYeast } from 'app/shared/model/yeast.model';
import { YeastService } from './yeast.service';

@Component({
    selector: 'jhi-yeast-delete-dialog',
    templateUrl: './yeast-delete-dialog.component.html'
})
export class YeastDeleteDialogComponent {
    yeast: IYeast;

    constructor(private yeastService: YeastService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.yeastService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'yeastListModification',
                content: 'Deleted an yeast'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-yeast-delete-popup',
    template: ''
})
export class YeastDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ yeast }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(YeastDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.yeast = yeast;
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
