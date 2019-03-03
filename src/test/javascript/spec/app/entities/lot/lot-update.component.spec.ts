/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { LotUpdateComponent } from 'app/entities/lot/lot-update.component';
import { LotService } from 'app/entities/lot/lot.service';
import { Lot } from 'app/shared/model/lot.model';

describe('Component Tests', () => {
    describe('Lot Management Update Component', () => {
        let comp: LotUpdateComponent;
        let fixture: ComponentFixture<LotUpdateComponent>;
        let service: LotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [LotUpdateComponent]
            })
                .overrideTemplate(LotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Lot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lot = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Lot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lot = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
