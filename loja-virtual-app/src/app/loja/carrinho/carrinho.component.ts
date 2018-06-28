import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Produto } from '../../admin/produto/produto.model';
import { ProdutoService } from '../../admin/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../admin/categoria/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from './carrinho.service';
import { ExemplarProduto } from '../../admin/produto/exemplar-produto.model';
// tslint:disable:no-inferrable-types

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  providers: [ProdutoService, CarrinhoService],
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public produtos: Array<ExemplarProduto> = new Array<ExemplarProduto>();
  public listaFiltrada = [];
  public paraExcluir: any;
  public filtroNomeProduto = '';
  public categorias: Array<any>;
  public categoriaAtual: any;
  public quantidadeSelecionada: number = 1;
  public subtotal: number = 0;
  public quantidade: number = 1;

  constructor(private produtoService: ProdutoService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.carregar();
  }

  public carregar() {
    let listaCarrinho: Array<number> = this.carrinhoService.getProdutos();
    listaCarrinho.forEach(p => this.produtoService.getExemplarCarrinho(p)
      .subscribe(data => {
        this.produtos.push(data);
        //console.log('Dados: ', data);
        this.corrigiQuantidade();
        this.calculaSubtotal();
      })
    );
  }
  

  public corrigiQuantidade(){
    for (let i = 0; i < this.produtos.length; i++) {
      this.produtos[i].quantidadeComprada = 1;
    }
  }

  public usuarioLogado() {
    return false;
  }

  public getExemplarCarrinho(produto: Produto, exemplarId: number) {
    return produto.exemplarprodutos.find(e => e.id == exemplarId);
  }

  calcularPreco(venda, quantidade){
    //console.log(this.produtos);
    // this.produtos.
    return (venda * quantidade).toFixed(2);
  }
  
/*
  public excluir() {
    if (this.paraExcluir) {
      this.produtoService.delete(this.paraExcluir.id)
        .subscribe(deletado => {
          this.carregar();
          console.log('Produto deletado com sucesso!!');
        });
    }
  }

  public marcarParaExcluir(produto: any) {
    this.paraExcluir = produto;
  }
*/

  public calculaSubtotal() {
    this.subtotal = 0;
    console.log(this.produtos);
    for (let i = 0; i < this.produtos.length; i++) {
      this.subtotal += (this.produtos[i].quantidadeComprada * this.produtos[i].produto.venda);
    }
  }

}
