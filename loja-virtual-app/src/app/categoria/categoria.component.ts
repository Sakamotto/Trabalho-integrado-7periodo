import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  providers: [CategoriaService],
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  id: number;
  sub: any;
  
  public categoria: Categoria;

  constructor(private http: Http, private categoriaService: CategoriaService, private route: ActivatedRoute) {
    this.categoria = new Categoria();
    
  }

  ngOnInit() {
    
    this.sub== this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
    
    if(this.id > 0){
      this.categoriaService.getById(this.id)
      .subscribe(
      _categoria => {
        this.categoria = _categoria;
        console.log(this.categoria);
    });
    }
  }
  
  cadastrar(){
    if(this.id == 0){
      this.categoriaService.post({categoria: this.categoria}) .subscribe(c => {
        console.log('categoria: ', c);
      });
    }
    else{
      this.categoriaService.put(this.id, {categoria: this.categoria}) .subscribe(c => {
        console.log('categoria: ', c);
      });
      
    }
  }

}
