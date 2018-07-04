import { ExemplarProduto } from '../../admin/produto/exemplar-produto.model';
import { Produto } from '../../admin/produto/produto.model';

export class Carrinho {
    cliente: number;
    exemplarprodutos: Array<ExemplarProduto>;
    subtotal: number;
    frete: number;

    constructor() {
        this.exemplarprodutos = new Array<ExemplarProduto>();
    }
}
