/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { MashbillComponent } from 'app/entities/mashbill/mashbill.component';
import { MashbillService } from 'app/entities/mashbill/mashbill.service';
import { Mashbill } from 'app/shared/model/mashbill.model';

describe('Component Tests', () => {
    describe('Mashbill Management Component', () => {
        let comp: MashbillComponent;
        let fixture: ComponentFixture<MashbillComponent>;
        let service: MashbillService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillComponent],
                providers: []
            })
                .overrideTemplate(MashbillComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MashbillComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Mashbill(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mashbills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
