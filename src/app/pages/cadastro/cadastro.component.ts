import { Component, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeEstadoModule } from 'src/app/shared/components/cidade-estado/cidade-estado.component';

@Component({
  templateUrl: 'cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent{

  estadoSelect?: string
  cidadeSelect?: string

  receberEstadoSelecionado(estadoSelecionado: any) {
    console.log('Estado Selecionado:', estadoSelecionado)
    this.estadoSelect = estadoSelecionado.Label
  }
  
  receberCidadeSelecionada(cidadeSelecionada: any) {
    console.log('Cidade Selecionado:', cidadeSelecionada)
    this.cidadeSelect = cidadeSelecionada.name
  }
}

@NgModule({
  imports: [
    CommonModule,
    CidadeEstadoModule
  ],
  declarations: [CadastroComponent],
  exports: [CadastroComponent]
})
export class CadastroModule { }
