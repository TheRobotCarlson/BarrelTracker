/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { YeastComponent } from 'app/entities/yeast/yeast.component';
import { YeastService } from 'app/entities/yeast/yeast.service';
import { Yeast } from 'app/shared/model/yeast.model';

describe('Component Tests', () => {
    describe('Yeast Management Component', () => {
        let comp: YeastComponent;
        let fixture: ComponentFixture<YeastComponent>;
        let service: YeastService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [YeastComponent],
                providers: []
            })
                .overrideTemplate(YeastComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(YeastComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YeastService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Yeast(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.yeasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
