import { MenuInicioComponent } from '../menu-inicio/menu-inicio.component';
import { CarrinhoComponent } from './carrinho.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const carrinhoRouting = [
    {
        path: 'loja', component: MenuInicioComponent, children: [
            { path: 'carrinho', component: CarrinhoComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(carrinhoRouting)],
    exports: [RouterModule],
})
export class CarrinhoRoutingModule {

}
