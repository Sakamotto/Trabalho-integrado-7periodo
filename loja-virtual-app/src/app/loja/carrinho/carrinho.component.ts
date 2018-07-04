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
  public showSpinner = true;
  public cep = '';
  public valorFrete: number = 0;

  public tamanhos = [{ id: 1, nome: 'PP' }, { id: 2, nome: 'P' }, { id: 3, nome: 'M' }, { id: 4, nome: 'G' }, { id: 5, nome: 'GG' }];

  constructor(private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private http: Http,private router: Router,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.carregar();
  }

  public carregar() {
    const listaCarrinho: Array<number> = this.carrinhoService.getProdutos() ? this.carrinhoService.getProdutos(): new Array<number>();
    listaCarrinho.forEach(p => this.produtoService.getExemplarCarrinho(p)
      .subscribe(data => {
        this.produtos.push(data);
        this.corrigiQuantidade();
        this.calculaSubtotal();
        this.showSpinner = false;
      })
    );
    this.showSpinner = false;
  }


  public corrigiQuantidade() {
    for (let i = 0; i < this.produtos.length; i++) {
      this.produtos[i].quantidadeComprada = 1;
    }
  }

  public usuarioLogado() {
    return false;
  }

  public getExemplarCarrinho(produto: Produto, exemplarId: number) {
    return produto.exemplarprodutos.find(e => e.id === exemplarId);
  }

  calcularPreco(venda, quantidade) {
    return (venda * quantidade).toFixed(2);
  }

  public remover(produto: ExemplarProduto) {
    const index = this.produtos.indexOf(produto);
    this.produtos.splice(index, 1);
    this.carrinhoService.removerProduto(produto.id);
    this.calculaSubtotal();
  }

  public calculaSubtotal() {
    this.subtotal = 0;
    for (let i = 0; i < this.produtos.length; i++) {
      this.subtotal += (this.produtos[i].quantidadeComprada * this.produtos[i].produto.venda);
    }
  }

  public calcularFrete() {
    if (this.cep) {
      this.produtoService.calcularFrete(this.cep).subscribe(data => {
        this.valorFrete = +((data.cResultado.Servicos[0].cServico[0].Valor[0]).replace(',', '.'));
        this.calculaSubtotal();
      });
    }
  }

  public prosseguir(){
    this.carrinhoService.adicionarCliente(1);
    this.carrinhoService.adicionarSubtotal(this.subtotal);
    this.carrinhoService.adicionarFrete(this.valorFrete);
    this.toastr.success('Sucesso!', 'Produto Adicionado ao Carrinho!');
    this.router.navigate(['loja/pagamento']);
    
  }
}
