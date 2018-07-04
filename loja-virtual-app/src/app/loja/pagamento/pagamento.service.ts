import { Injectable } from '@angular/core';
import { ServiceBase } from '../../admin/shared/service-base.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PagamentoService extends ServiceBase {
    constructor(protected http: Http,
        protected router: Router) {
        super(http, router, 'compra');
    }

    public finalizarCompra(dados: any): Observable<any> {
        return this.postAny('finalizarCompra', dados);
    }

    public minhasCompras(clienteId: number): Observable<any> {
        return this.postAny('getMinhasCompras', clienteId);
    }
}
