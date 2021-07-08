import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  
  birth: number[] = [];
  form!: FormGroup;
  data: any;
  date: any;
  img: any;
  constructor(
    private fb: FormBuilder, 
    private apiSrv: ApiService,
    private toastrService: ToastrService,
    private ngxSpinnerService: NgxSpinnerService,
    ) { }
    
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      nomep: ['', Validators.required],
      raca: ['', Validators.required],
      anop: ['', Validators.required],
      formFile: ['']
    })

    this.getyear();


  }
  
  getyear(){
    this.date = new Date;
    for(var i = this.date.getFullYear(); i>= (this.date.getFullYear() - 30); i-- ){
      this.birth.push(i);
    }
  }
  
  submit(){
  
    this.ngxSpinnerService.show();
    this.data = {
      ownerName: this.form.get('nome')?.value,
      ownerCpf: this.form.get('cpf')?.value,
      petName: this.form.get('nomep')?.value,
      breedDog: this.form.get('raca')?.value,
      yearBirth: this.form.get('anop')?.value || this.date.getFullYear(),
      img: this.img
      
    }
    this.apiSrv.cadastro(this.data).subscribe(
      success => {
        if(success){
          alert("Cadastrado com Sucesso");
        }
      },
      error => {
        console.error(error);
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
      
          return console.log('Error ', err);
      }
    }
  }
