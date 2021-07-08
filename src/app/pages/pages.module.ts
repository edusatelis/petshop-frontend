import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListComponent } from './list/list.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDetalheComponent } from './list-detalhe/list-detalhe.component'


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CadastroComponent,
    ListComponent,
    ListDetalheComponent

  ],
  imports: [  
    HttpClientModule,
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    })
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HomeComponent,
    CadastroComponent,
    ListComponent    
  ],
  providers:[
    ApiService,
    HttpClient
  ]
})
export class PagesModule { }
