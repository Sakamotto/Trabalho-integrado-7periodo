import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../../admin/login/login.service';
import { Cliente } from '../../admin/cliente/cliente.model';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.css']
})
export class MinhasComprasComponent implements OnInit {

  public cliente: Cliente;
  public minhasCompras: Array<any> = new Array<any>();

  constructor(private perfilService: PerfilService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.cliente = this.loginService.getUserInfo();
    this.perfilService.minhasCompras(this.cliente.id)
    .subscribe(_minhasCompras => {
      this.minhasCompras = _minhasCompras;
      console.log('Minhas Compras: ', _minhasCompras);
    });
  }

}
