import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../admin/produto/produto.service';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css'],
  providers: [ProdutoService]
})
export class MenuInicioComponent implements OnInit {

  public produtos = [];
  public filtroNomeProduto: string = '';
  public showSpinner = true;
  constructor(private serviceProduto: ProdutoService) { }

  ngOnInit() {
    console.log('Menu Inicio');
    // this.serviceProduto.getAll().subscribe(data => {
    //   this.produtos = data;
    //   this.showSpinner = false;
    // });
  }

  public buscar() {
    const filtros = {nome: this.filtroNomeProduto};
    this.serviceProduto.getAll(filtros).subscribe(data =>{
      this.produtos = data;
      console.log(data);
    });
    console.log('Buscando: ', this.filtroNomeProduto);
  }

}
