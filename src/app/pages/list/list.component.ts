import { Component, OnInit } from '@angular/core';
import { IPets } from 'src/app/models/pets.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  list: IPets[] = [];
  
  constructor(private apiSrv: ApiService) { 
    
  }

  ngOnInit(): void {
      this.apiSrv.pets().subscribe(pets => this.list = pets )
  }

  setLocal(id:string){
    localStorage.setItem("id", id);
  }

  deletar(id: any){
    this.apiSrv.deletar(id).subscribe(
      pet => {
        alert("Pet Deletado!!");
        window.location.reload()
      }
    )
  }
}
