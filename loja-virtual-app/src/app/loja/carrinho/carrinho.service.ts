import { Injectable } from '@angular/core';
import { Produto } from '../../admin/produto/produto.model';
import { Carrinho } from './carrinho.model';
import { ExemplarProduto } from '../../admin/produto/exemplar-produto.model';

@Injectable()
export class CarrinhoService {
    // tslint:disable:prefer-const
    adicionarProduto(exemplarId: number): boolean {
        // Verificar se já existe um carrinho com produtos
        if (localStorage.getItem('carrinho_online')) {
            let dados: Array<number> = JSON.parse(localStorage.getItem('carrinho_online'));
            if (dados.indexOf(exemplarId) === -1) {
                dados.push(exemplarId);
                localStorage.setItem('carrinho_online', JSON.stringify(dados));
                return true;
            }
            return false;
        } else {
            localStorage.setItem('carrinho_online', JSON.stringify([exemplarId]));
            return true;
        }
    }

    getProdutos() {
        return JSON.parse(localStorage.getItem('carrinho_online'));
    }

    removerProduto(exemplarId: number) {
        // Verificar se já existe um carrinho com produtos
        if (localStorage.getItem('carrinho_online')) {
            let dados: Array<number> = JSON.parse(localStorage.getItem('carrinho_online'));
            dados.splice(dados.indexOf(exemplarId), 1);
            localStorage.setItem('carrinho_online', JSON.stringify(dados));
        }
    }

    removerProdutos() {
        // Apaga o conteúdo do carrinho
        localStorage.removeItem('carrinho_online');
    }


}
