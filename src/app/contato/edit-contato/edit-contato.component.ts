import { ToastrService } from 'ngx-toastr';
import { ContatoService } from './../contato.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-contato',
  templateUrl: './edit-contato.component.html',
  styleUrls: ['./edit-contato.component.css']
})
export class EditContatoComponent implements OnInit {
   contatoForm: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
    this.contatoForm = this.createForm();
  }

  createForm(){
    return this.fb.group({
      time: new FormControl('', Validators.required),
      tamanho: new FormControl('', Validators.required),
      ano: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')])
    });
  }


  ngOnInit(){
    //ler ID
    const id = this.activeRoute.snapshot.paramMap.get('id');

    //ANGULAR FIRE
    if (id != null) {
      this.contatoService.getContatoById(id).valueChanges().subscribe(data => {
        this.contatoForm.setValue(data as any);//JSON
      });
    }
  }

  submitForm(){
    this.contatoService.updateContato(this.contatoForm.value);
    this.toastr.success(
      this.contatoForm.controls['time'].value + " atualizado."
    );
    this.router.navigate(['list-contato']);
  }

  goBack(){
    this.location.back();
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
