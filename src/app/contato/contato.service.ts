import { Injectable } from '@angular/core';

//ANGULAR FIRE
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';

import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  listaContatosRef: AngularFireList<Contato>;
  contatoRef: AngularFireObject<Contato>;

  constructor(private db: AngularFireDatabase) {
    this.listaContatosRef = this.db.list('list-contato');
    this.contatoRef = this.db.object('list-contato/' + 0);
  }

  //CREATE RUD
  insertContato(contato: Contato){
    this.listaContatosRef.push(
      {
        time: contato.time,
        tamanho: contato.tamanho,
        ano: contato.ano
      }
    );
  }

  //C Read UD
  getContatoById(id: string): AngularFireObject<Contato> {
    this.contatoRef = this.db.object('list-contato/'+ id);
    return this.contatoRef;
  }

  getContatoList(): AngularFireList<Contato> {
    return this.listaContatosRef;
  }

  //CR Update D
  updateContato(contato: Contato){
    this.contatoRef.update({
      time: contato.time,
      tamanho: contato.tamanho,
      ano: contato.ano
    });
  }

  //CRU Delete
  deleteContato(id: String) {
    this.contatoRef = this.db.object('list-contato/' + id);
    this.contatoRef.remove();
  }

}
