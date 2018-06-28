import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../admin/shared/shared.module';
import { CarrinhoComponent } from './carrinho.component';
import { CarrinhoRoutingModule } from './carrinho.rounting.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        CarrinhoRoutingModule
    ],
    exports: [
        CarrinhoComponent
    ],
    declarations: [
        CarrinhoComponent
    ]
})
export class CarrinhoModule {

}
