/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { ScheduleComponent } from 'app/entities/schedule/schedule.component';
import { ScheduleService } from 'app/entities/schedule/schedule.service';
import { Schedule } from 'app/shared/model/schedule.model';

describe('Component Tests', () => {
    describe('Schedule Management Component', () => {
        let comp: ScheduleComponent;
        let fixture: ComponentFixture<ScheduleComponent>;
        let service: ScheduleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ScheduleComponent],
                providers: []
            })
                .overrideTemplate(ScheduleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScheduleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Schedule(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.schedules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
