/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { GrainComponent } from 'app/entities/grain/grain.component';
import { GrainService } from 'app/entities/grain/grain.service';
import { Grain } from 'app/shared/model/grain.model';

describe('Component Tests', () => {
    describe('Grain Management Component', () => {
        let comp: GrainComponent;
        let fixture: ComponentFixture<GrainComponent>;
        let service: GrainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainComponent],
                providers: []
            })
                .overrideTemplate(GrainComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GrainComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrainService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Grain(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.grains[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
