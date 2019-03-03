/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { BatchComponent } from 'app/entities/batch/batch.component';
import { BatchService } from 'app/entities/batch/batch.service';
import { Batch } from 'app/shared/model/batch.model';

describe('Component Tests', () => {
    describe('Batch Management Component', () => {
        let comp: BatchComponent;
        let fixture: ComponentFixture<BatchComponent>;
        let service: BatchService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BatchComponent],
                providers: []
            })
                .overrideTemplate(BatchComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BatchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Batch(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.batches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
