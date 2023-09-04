import { Component, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeEstadoModule } from 'src/app/shared/components/cidade-estado/cidade-estado.component';

@Component({
  templateUrl: 'cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent{

  receberEstadoSelecionado(estadoSelecionado: any) {
    console.log('Estado Selecionado:', estadoSelecionado)
  }
  
  receberCidadeSelecionada(cidadeSelecionada: any) {
    console.log('Cidade Selecionado:', cidadeSelecionada)
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
