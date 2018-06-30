import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../admin/produto/produto.service';
import { CategoriaService } from '../../admin/categoria/categoria.service';
import { Filtro } from '../shared-services/filtro.model';

@Component({
  selector: 'app-dashboard-inicio',
  templateUrl: './dashboard-inicio.component.html',
  styleUrls: ['./dashboard-inicio.component.css'],
  providers: [ProdutoService, CategoriaService],
  host: { 'class': "page-content" }
})
export class DashboardInicioComponent implements OnInit {
  public filtroCategoria = [];
  public categorias = [];
  public produtos = [];
  public showSpinner = true;
  public filtroNomeProduto = '';
  public filtroCategoriaId: number = null;
  public filtroPrecoMin: number = null;
  public filtroPrecoMax: number = null;
  public filtros: Filtro = new Filtro();
  constructor(private serviceProduto: ProdutoService, private serviceCategoria: CategoriaService) { }

  ngOnInit() {
    this.serviceProduto.getAll().subscribe(data => {
      this.produtos = data;
      this.showSpinner = false;
    });

    this.serviceCategoria.getAll().subscribe(data => {
      this.categorias = data;
    });
  }

  public buscar() {
    this.filtros.nome = this.filtroNomeProduto;
    this.filtros.categoriaId = this.filtroCategoriaId;
    this.filtros.precoMin = this.filtroPrecoMin;
    this.filtros.precoMax = this.filtroPrecoMax;

    this.showSpinner = true;
    this.serviceProduto.getAll(this.filtros).subscribe(data => {
      this.produtos = data;
      this.showSpinner = false;
    });
  }

}
