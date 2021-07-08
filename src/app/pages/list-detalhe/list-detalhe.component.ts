import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PetsGetResponseDto } from '../../models/dtos/pets-get-response.dto';
import { IPets } from '../../models/pets.interface';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-list-detalhe',
  templateUrl: './list-detalhe.component.html',
  styleUrls: ['./list-detalhe.component.css']
})
export class ListDetalheComponent implements OnInit {

  form: FormGroup;
  img?: string;
  data: any;
  date: any;
  birth: any[] = [];
  id:any = localStorage.getItem("id");
  request?: PetsGetResponseDto;
  
  constructor(
    private apiSrv: ApiService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private ngxSpinnerService: NgxSpinnerService,
    ) {
      this.form = this.fb.group({
        nome: ['', Validators.required],
        cpf: ['', Validators.required],
        nomep: ['', Validators.required],
        raca: ['', Validators.required],
        anop: ['', Validators.required],
        formFile: ['']
      })
    }

    
    ngOnInit(): void {
      this.getyear();
      this.get()

    }

  getyear(){
      this.date = new Date;
      for(var i: any = this.date.getFullYear(); i>= (this.date.getFullYear() - 30); i-- ){
        this.birth.push(i);
      }
  }
  get(){
    this.apiSrv.getById(this.id).subscribe(
      pets =>{
        this.request = pets
      }  
    )
  }

  submit(){
  
    this.ngxSpinnerService.show();
    this.data = {
      ownerName: this.form.get('nome')?.value || this.request?.ownerName,
      ownerCpf: this.form.get('cpf')?.value || this.request?.ownerCpf,
      petName: this.form.get('nomep')?.value || this.request?.petName,
      breedDog: this.form.get('raca')?.value || this.request?.breedDog,
      yearBirth: this.form.get('anop')?.value || this.request?.yearBirth ||this.date.getFullYear(),
      img: this.request?.img ||this.img 
      
    }
    console.log(this.data)
    this.apiSrv.editar(this.id,this.data).subscribe(
      success => {
        if(success){
          alert("Pet Atualizado com sucesso");
        }
      },
      error => {
        alert(error.message);
      }
    ) 
  }

  uploadFile(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
      reader.onload = () =>{
        return this.img = reader.result?.toString()    
      }
      reader.onerror = (err) =>{
          console.log('Error ', err);
        return;
      }
    }
  }