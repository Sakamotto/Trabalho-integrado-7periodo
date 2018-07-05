import { NgModule } from '@angular/core';
import { MinhasComprasComponent } from './minhas-compras.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuInicioComponent } from '../menu-inicio/menu-inicio.component';

const minhasComprasRouting = [
    {
        path: 'loja', component: MenuInicioComponent, children: [
            { path: 'minhas-compras', component: MinhasComprasComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(minhasComprasRouting)],
    exports: [RouterModule],
})

export class MinhasComprasRoutingModule {

}
