import { NgModule } from '@angular/core';
import { MinhasComprasComponent } from './minhas-compras.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfilService } from './perfil.service';
import { MinhasComprasRoutingModule } from './minhas-compras.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MinhasComprasRoutingModule
    ],
    declarations: [MinhasComprasComponent],
    exports: [MinhasComprasComponent],
    providers: [PerfilService]
})

export class MinhasComprasModule {

}
