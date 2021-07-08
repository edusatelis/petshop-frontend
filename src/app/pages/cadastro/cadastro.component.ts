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
    const date = new Date;
    for(var i = date.getFullYear(); i>= (date.getFullYear() - 30); i-- ){
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
      yearBirth: this.form.get('anop')?.value,
      img: this.img
      
    }
    console.log(this.data)
    this.apiSrv.cadastro(this.data).subscribe(
      success => {
        if(success){
          alert("Cadastrado com Sucesso");
          this.runCreateSuccess();
        }
      },
      error => {
        this.runError(error);
      }
    ) 
  }

  uploadFile(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () =>{
      const toastr = this.toastrService.success('Sucess', 'File Uploaded', {});
      if (toastr) {
        toastr.onHidden.subscribe(() => {
          this.img = reader.result?.toString()
        });
        return;
      }
    };
    reader.onerror = (err) =>{
      const toastr = this.toastrService.error('Error', 'error sending', {});
      if (toastr) {
        toastr.onHidden.subscribe(() => {
          console.log('Error ', err);
        });
        return;
      }
    }
  }
  runCreateSuccess(): void {
    const toastr = this.toastrService.success('Pet Cadastrado!!', 'Success');
    if (toastr) {
        toastr.onHidden.subscribe(() => {
            this.form.reset();
            this.ngxSpinnerService.hide();
        });
    }
}

runError(exception: any) {
    const toastr = this.toastrService.error(exception.error.erros[0], 'Error', {
        progressBar: true
    });

    if (toastr)
        toastr.onHidden.subscribe(() => {
            this.ngxSpinnerService.hide();
        });
}

}
