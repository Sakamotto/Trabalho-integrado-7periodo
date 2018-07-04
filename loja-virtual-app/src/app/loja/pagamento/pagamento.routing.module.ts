import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuInicioComponent } from '../menu-inicio/menu-inicio.component';
import { PagamentoComponent } from './pagamento.component';

const pagamentoRouting = [
    {
        path: 'loja', component: MenuInicioComponent, children: [
            { path: 'pagamento', component: PagamentoComponent },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(pagamentoRouting)],
    exports: [RouterModule],
})
export class PagamentoRoutingModule {

}
