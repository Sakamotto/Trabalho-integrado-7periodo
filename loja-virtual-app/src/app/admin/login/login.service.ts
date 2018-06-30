import { Injectable } from '@angular/core';
import { ServiceBase } from '../shared/service-base.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoginService extends ServiceBase {

    constructor(protected http: Http, protected router: Router, private toastr: ToastrService) {
        super(http, router, 'cliente');
    }

    public login(email: string, senha: string): Observable<any> {
        return this.postAny('login', { email: email, senha: senha });
    }

    public loginAndStore(email: string, senha: string) {
        this.postAny('login', { email: email, senha: senha })
            .subscribe(auth => {
                if (auth.sucesso) {
                    localStorage.setItem('token', auth.token);
                    localStorage.setItem('user', auth.user);
                } else {
                    this.toastr.error('Login ou senha inválidos', 'Erro!');
                }
            });
    }

    public logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    public logoutCliente() {
        localStorage.removeItem('token');
    }

    public getUserInfo() {
        return JSON.parse(localStorage.getItem('user'));
    }

    public usuarioLogado(): boolean {
        return localStorage.getItem('token') != null;
    }

    public verifyToken(): Observable<any> {
        return this.getAny('token').map(data => data.sucesso);
    }

}
