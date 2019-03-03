import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from './mashbill-grain.service';

@Component({
    selector: 'jhi-mashbill-grain-delete-dialog',
    templateUrl: './mashbill-grain-delete-dialog.component.html'
})
export class MashbillGrainDeleteDialogComponent {
    mashbillGrain: IMashbillGrain;

    constructor(
        private mashbillGrainService: MashbillGrainService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mashbillGrainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mashbillGrainListModification',
                content: 'Deleted an mashbillGrain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mashbill-grain-delete-popup',
    template: ''
})
export class MashbillGrainDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbillGrain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MashbillGrainDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mashbillGrain = mashbillGrain;
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
