import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Produto } from '../../admin/produto/produto.model';
import { ProdutoService } from '../../admin/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../admin/categoria/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { ExemplarProduto } from '../../admin/produto/exemplar-produto.model';
import { LoginService } from '../../admin/login/login.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  providers: [ProdutoService, CarrinhoService],
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  public produtos: Array<ExemplarProduto> = new Array<ExemplarProduto>();
  public subtotal: number;
  public frete: number;
  public user: any;

  constructor(private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private http: Http,
    private router: Router,
    public toastr: ToastrService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.subtotal = this.carrinhoService.getSubtotal();
    this.frete = this.carrinhoService.getfrete();
    if (this.usuarioLogado()) {
      this.user = this.loginService.getUserInfo();
    }
  }

  public carregar() {
    const listaCarrinho: Array<number> = this.carrinhoService.getProdutos();
    listaCarrinho.forEach(p => this.produtoService.getExemplarCarrinho(p)
      .subscribe(data => {
        this.produtos.push(data);
      })
    );
  }

  public getExemplarCarrinho(produto: Produto, exemplarId: number) {
    return produto.exemplarprodutos.find(e => e.id === exemplarId);
  }

  public usuarioLogado() {
    return this.loginService.usuarioLogado();
  }

}
