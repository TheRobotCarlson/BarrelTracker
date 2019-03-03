import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    LotComponent,
    LotDetailComponent,
    LotUpdateComponent,
    LotDeletePopupComponent,
    LotDeleteDialogComponent,
    lotRoute,
    lotPopupRoute
} from './';

const ENTITY_STATES = [...lotRoute, ...lotPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LotComponent, LotDetailComponent, LotUpdateComponent, LotDeleteDialogComponent, LotDeletePopupComponent],
    entryComponents: [LotComponent, LotUpdateComponent, LotDeleteDialogComponent, LotDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledLotModule {}
