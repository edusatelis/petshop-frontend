import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListComponent } from './list/list.component';

const pagesRoute: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'list', component: ListComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoute)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
