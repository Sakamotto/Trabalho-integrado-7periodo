import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {PagamentoComponent} from './pagamento.component';
import { PagamentoRoutingModule } from './pagamento.routing.module';
import { PagamentoService } from './pagamento.service';
// import { SharedModule } from '../../admin/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        // SharedModule,
        PagamentoRoutingModule
    ],
    exports: [
        PagamentoComponent
    ],
    declarations: [
        PagamentoComponent
    ],
    providers: [PagamentoService]
})
export class PagamentoModule {

}
