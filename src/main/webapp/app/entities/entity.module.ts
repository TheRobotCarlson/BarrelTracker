import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DistilledGrainModule } from './grain/grain.module';
import { DistilledYeastModule } from './yeast/yeast.module';
import { DistilledMashbillGrainModule } from './mashbill-grain/mashbill-grain.module';
import { DistilledMashbillYeastModule } from './mashbill-yeast/mashbill-yeast.module';
import { DistilledMashbillModule } from './mashbill/mashbill.module';
import { DistilledCustomerModule } from './customer/customer.module';
import { DistilledBarrelModule } from './barrel/barrel.module';
import { DistilledBatchModule } from './batch/batch.module';
import { DistilledScheduleModule } from './schedule/schedule.module';
import { DistilledLotModule } from './lot/lot.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DistilledGrainModule,
        DistilledYeastModule,
        DistilledMashbillGrainModule,
        DistilledMashbillYeastModule,
        DistilledMashbillModule,
        DistilledCustomerModule,
        DistilledBarrelModule,
        DistilledBatchModule,
        DistilledScheduleModule,
        DistilledLotModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledEntityModule {}
