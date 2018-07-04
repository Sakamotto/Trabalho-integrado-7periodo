import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Produto } from '../../admin/produto/produto.model';
import { ProdutoService } from '../../admin/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../admin/categoria/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { ExemplarProduto } from '../../admin/produto/exemplar-produto.model';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  providers: [ProdutoService, CarrinhoService],
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  
    public produtos: Array<ExemplarProduto> = new Array<ExemplarProduto>();
    public subtotal: number;
    public frete:number;


  constructor(private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private http: Http,private router: Router,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.carrinhoService.getSubtotal().subscribe(_subtotal => {
          this.subtotal = _subtotal;
      });
    this.carrinhoService.getfrete().subscribe(_frete => {
      this.frete = _frete;
    });
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


}
