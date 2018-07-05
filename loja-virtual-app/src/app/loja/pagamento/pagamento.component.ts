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
import { Cliente } from '../../admin/cliente/cliente.model';
import { ClienteService } from '../../admin/cliente/cliente.service';
import { PagamentoService } from './pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  providers: [ProdutoService, CarrinhoService, ClienteService],
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  public produtos: Array<ExemplarProduto> = new Array<ExemplarProduto>();
  public subtotal: number;
  public frete: number;
  public user: Cliente = new Cliente();
  public numeroCartao: string;
  public nomeCartao: string;
  public mesCartao: number;
  public anoCartao: number;
  public codigoSeguranca: number;

  constructor(private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private http: Http,
    private router: Router,
    public toastr: ToastrService,
    private loginService: LoginService,
    private clienteService: ClienteService,
    private pagamentoService: PagamentoService
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

  public registrar() {
    this.clienteService.post({ cliente: this.user })
      .subscribe(data => {
        this.toastr.success('Usuário registrado com sucesso!', 'Sucesso!');
        window.location.reload();
      }, error => {
        this.toastr.error('Erro ao registrar usuario', 'Erro!');
      });
  }

  public getClienteEndereco() {
    return this.user.endereco.cidade + ' - ' + this.user.endereco.estado + ', ' + this.user.endereco.cep;
  }

  public finalizarCompra() {

    if (this.camposPreenchidos()) {

      const dados = {
        exemplares: this.carrinhoService.getProdutos(),
        clienteId: this.user.id,
        quantidade: 1,
        desconto: 0,
        totalCompra: this.frete + this.subtotal
      };

      this.pagamentoService.finalizarCompra(dados).subscribe(data => {
        this.toastr.success(data.mensagem, 'Sucesso!');
        this.carrinhoService.removerProdutos();
        this.router.navigate(['/loja/minhas-compras']);
      }, error => {
        this.toastr.error(error.mensagem, 'Erro!');
      });
    } else {
      this.toastr.error('Todos os dados de pagamento deve ser preenchido', 'Erro');
    }

  }

  public camposPreenchidos() {
    return (this.numeroCartao && this.nomeCartao && this.mesCartao && this.anoCartao && this.codigoSeguranca);
  }

}
