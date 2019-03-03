/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { LotDeleteDialogComponent } from 'app/entities/lot/lot-delete-dialog.component';
import { LotService } from 'app/entities/lot/lot.service';

describe('Component Tests', () => {
    describe('Lot Management Delete Component', () => {
        let comp: LotDeleteDialogComponent;
        let fixture: ComponentFixture<LotDeleteDialogComponent>;
        let service: LotService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [LotDeleteDialogComponent]
            })
                .overrideTemplate(LotDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LotDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotService);
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
