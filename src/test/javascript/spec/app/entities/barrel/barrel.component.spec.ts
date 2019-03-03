/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { BarrelComponent } from 'app/entities/barrel/barrel.component';
import { BarrelService } from 'app/entities/barrel/barrel.service';
import { Barrel } from 'app/shared/model/barrel.model';

describe('Component Tests', () => {
    describe('Barrel Management Component', () => {
        let comp: BarrelComponent;
        let fixture: ComponentFixture<BarrelComponent>;
        let service: BarrelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BarrelComponent],
                providers: []
            })
                .overrideTemplate(BarrelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BarrelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarrelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Barrel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.barrels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
