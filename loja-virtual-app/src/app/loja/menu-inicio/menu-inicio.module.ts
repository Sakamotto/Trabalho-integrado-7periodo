import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuInicioComponent } from './menu-inicio.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../admin/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,
    ],
    exports: [
        MenuInicioComponent
    ],
    declarations: [
        MenuInicioComponent
    ],
    providers: []
})
export class MenuInicioModule {

}
