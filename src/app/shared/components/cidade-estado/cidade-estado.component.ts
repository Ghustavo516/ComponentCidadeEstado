
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { DxiFieldModule } from 'devextreme-angular/ui/nested';
import { DxSelectBoxModule } from 'devextreme-angular';
import { CidadeEstadoService } from '../../services/cidade-estado.service';

@Component({
  selector: 'app-cidade-estado',
  templateUrl: './cidade-estado.component.html',
  styleUrls: ['./cidade-estado.component.scss']
})
export class CidadeEstadoComponent implements OnInit{

  @Input() labelEstado?: string;
  @Input() labelCidade?: string;

  @Input() estadoPadrao?: number;
  @Input() cidadePadrao?: number;

  @Output() estadoSelecionadoValue = new EventEmitter<string>();
  @Output() cidadeSelecionadaValue = new EventEmitter<string>();

  estadoSelecionado?: string;
  cidadeSelecionada?: string; 

  estadoPadraoSelecionado ?: any[];
  cidadePadraoSelecionado ?: any[];

  estados: any[] = [];
  municipios: any[] = [];
  siglaUF: any;

  constructor(
    private estadoService: CidadeEstadoService,
    private municipioEstadoService: CidadeEstadoService){
  }

  ngOnInit(): void {
    this.consultaEstado();
  }

  consultaEstado(){
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data.map(estado => ({
        id: estado.id,
        UF: estado.sigla,
        Label: estado.sigla + ' - ' + estado.nome
      }));
  
      if(this.estadoPadrao != null && this.estadoPadrao >= 0){
        this.estadoPadraoSelecionado = this.estados[this.estadoPadrao]
      }
    })
  }

  onCidadeSelecionada(event: any){
    this.cidadeSelecionada = event.value;
    this.cidadeSelecionadaValue.emit(this.cidadeSelecionada);
  }

  onEstadoSelecionado(event: any){
    const estadoSelect = event.value;
    this.estadoSelecionado = event.value;
    this.estadoSelecionadoValue.emit(this.estadoSelecionado);
    this.consultaMunicipios(estadoSelect)
  }

  consultaMunicipios(estadoSelect:any){
    this.siglaUF = estadoSelect.UF;
    this.municipioEstadoService.getMunicipios(this.siglaUF).subscribe(data => {
      this.municipios = data.map(nomeMunicipio => ({
        id: nomeMunicipio.id,
        name: nomeMunicipio.nome
      }));

      if(this.cidadePadrao != null && this.cidadePadrao >= 0){
        this.cidadePadraoSelecionado = this.estados[this.cidadePadrao]
      }
    })
  } 
}

@NgModule({
  imports: [
    CommonModule,
    DxiFieldModule,
    DxSelectBoxModule,
    HttpClientModule
  ],
  declarations: [CidadeEstadoComponent],
  exports: [CidadeEstadoComponent]
})
export class CidadeEstadoModule { }
