
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { DxiFieldModule } from 'devextreme-angular/ui/nested';
import { DxSelectBoxModule } from 'devextreme-angular';
import { CidadeEstadoService } from '../../services/cidade-estado.service';
import { Estado } from 'src/app/model/Estado';
import { Cidade } from 'src/app/model/Cidade';

@Component({
  selector: 'app-cidade-estado',
  templateUrl: './cidade-estado.component.html',
  styleUrls: ['./cidade-estado.component.scss']
})
export class CidadeEstadoComponent implements OnInit{

  @Input() labelEstado?: string;
  @Input() labelCidade?: string;

  @Input() estadoPadrao?: String;
  @Input() cidadePadrao?: string;

  @Output() estadoSelecionadoValue = new EventEmitter<string>();
  @Output() cidadeSelecionadaValue = new EventEmitter<string>();

  estadoSelecionado?: string;
  cidadeSelecionada?: string; 

  estadoPadraoSelecionado ?: Estado;
  cidadePadraoSelecionado ?: Cidade;

  estados: Estado[] = [];
  municipios: Cidade[] = [];

  constructor(
    private estadoService: CidadeEstadoService,
    private municipioEstadoService: CidadeEstadoService){
  }

  ngOnInit(): void {
    this.consultaEstado();
  }

  consultaEstado(){
    //Metodo para obter os estados da API IBGE
    this.estadoService.getEstados().subscribe(data => {
      this.estados = [];
      for(let e of data){
        this.estados.push(new Estado(e))
      }
      this.setEstado();
    })
  }

  //Obtem os municipios de um estado selecionado pelo usuário
  consultaMunicipios(estado:Estado){
    if(estado.sigla){
      this.municipioEstadoService.getMunicipios(estado.sigla).subscribe( data => {
        this.municipios = [];
        for(let m of data){
          this.municipios.push(new Cidade(m))
        }
        this.setCidadeEstado();
      })
    }
  } 

  //Obtem o nome da cidade e envia para o usuario
  onCidadeSelecionada(event: any){
    this.cidadeSelecionada = event.value;
    this.cidadeSelecionadaValue.emit(this.cidadeSelecionada);
  }

  //Obtem o nome do estado e envia para o usuario
  onEstadoSelecionado(event: any){
    const estadoSelect = event.value;
    this.estadoSelecionadoValue.emit(estadoSelect);
    this.consultaMunicipios(estadoSelect)
    this.cidadeSelecionadaValue.emit(''); //Limpa o selectBox Cidade ao trocar o estado


  }

  //Seleciona automaticamente o nome do estado dentro do selectBoxEstado com base no valor padrão fornecido na definição do componente
  setEstado(){
    if(this.estadoPadrao != null){
      const valorIndice = this.estados.findIndex(estado => estado.sigla === this.estadoPadrao)
      if(valorIndice == -1){
        alert("Estado não encontrado, por favor verifique o nome digitado e acentuação!")
      }else{
        this.estadoPadraoSelecionado = this.estados[valorIndice]
      }
    }
  }

  //Seleciona automaticamente o nome da cidade dentro do selectBoxCidade com base no valor padrão fornecido na definição do componente
  setCidadeEstado(){
    if(this.cidadePadrao != null){
      const valorIndice = this.municipios.findIndex(nomeMunicipio =>  nomeMunicipio.nome === this.cidadePadrao)
      const nomeCidade = this.municipios[valorIndice]
      this.cidadePadraoSelecionado = nomeCidade
    }
  }
}

//Modulo do componente
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
