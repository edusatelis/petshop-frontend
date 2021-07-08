import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, DoCheck {
  

  isHome: boolean = false;
  isCadastro: boolean = false;
  isList: boolean = false;
  isListDetalhe: boolean = false;


  constructor() { }

  ngDoCheck() {
    const path = window.location.pathname;
    
    this.isCadastro = path === '/pages/cadastro' ? true : false;
    this.isList = path === '/pages/list' ? true : false;
    this.isListDetalhe = path === `/pages/list-detalhe/${localStorage.getItem("id")}` ? true : false;
    this.isHome = path === '/pages/home' ? true : false;
  }

  ngOnInit(): void {
   
  }

}
