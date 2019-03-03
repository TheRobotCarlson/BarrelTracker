/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { MashbillGrainDeleteDialogComponent } from 'app/entities/mashbill-grain/mashbill-grain-delete-dialog.component';
import { MashbillGrainService } from 'app/entities/mashbill-grain/mashbill-grain.service';

describe('Component Tests', () => {
    describe('MashbillGrain Management Delete Component', () => {
        let comp: MashbillGrainDeleteDialogComponent;
        let fixture: ComponentFixture<MashbillGrainDeleteDialogComponent>;
        let service: MashbillGrainService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillGrainDeleteDialogComponent]
            })
                .overrideTemplate(MashbillGrainDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MashbillGrainDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillGrainService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
