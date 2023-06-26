import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contato',
  templateUrl: './add-contato.component.html',
  styleUrls: ['./add-contato.component.css']
})
export class AddContatoComponent implements OnInit {
  contatoForm: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){
    this.contatoForm = this.createForm();
  }

  createForm(){
    return this.fb.group({
      time: new FormControl('', Validators.required),
      tamanho: new FormControl('', Validators.required),
      ano: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
  }

  ngOnInit() {
    this.contatoService.getContatoList();
  }

  resetForm(){
    this.contatoForm.reset();
  }

  submitForm(){
    this.contatoService.insertContato(this.contatoForm.value);
    this.toastr.success(
      this.contatoForm.controls['time'].value + " adicionado."
    );
  }

  get time(){
    return this.contatoForm.get('time');
  }

  get tamanho(){
    return this.contatoForm.get('tamanho');
  }

  get ano(){
    return this.contatoForm.get('ano');
  }
}
