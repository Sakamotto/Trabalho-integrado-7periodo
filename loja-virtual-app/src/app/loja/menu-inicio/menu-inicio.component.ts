import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../admin/produto/produto.service';
import { LoginService } from '../../admin/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css'],
  providers: [ProdutoService]
})
export class MenuInicioComponent implements OnInit {

  public produtos = [];
  public filtroNomeProduto = '';
  public showSpinner = true;
  public email: string;
  public senha: string;
  public userName: string;
  constructor(private serviceProduto: ProdutoService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.usuarioLogado()) {
      const user = this.loginService.getUserInfo();
      this.userName = user.nome + ' ' + user.sobrenome;
    }
  }

  public buscar() {
    const filtros = { nome: this.filtroNomeProduto };
    this.serviceProduto.getAll(filtros).subscribe(data => {
      this.produtos = data;
      console.log(data);
    });
  }

  public login() {
    this.loginService.loginAndStore(this.email, this.senha);
  }

  public logout() {
    this.loginService.logoutCliente();
    this.router.navigate(['/loja']);
    window.location.reload();
  }

  public usuarioLogado() {
    return this.loginService.usuarioLogado();
  }

}
