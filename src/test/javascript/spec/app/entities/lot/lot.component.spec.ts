/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { LotComponent } from 'app/entities/lot/lot.component';
import { LotService } from 'app/entities/lot/lot.service';
import { Lot } from 'app/shared/model/lot.model';

describe('Component Tests', () => {
    describe('Lot Management Component', () => {
        let comp: LotComponent;
        let fixture: ComponentFixture<LotComponent>;
        let service: LotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [LotComponent],
                providers: []
            })
                .overrideTemplate(LotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Lot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.lots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
