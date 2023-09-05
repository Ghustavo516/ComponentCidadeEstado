
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

  @Input() estadoPadrao?: String;
  @Input() cidadePadrao?: string;

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
    //Metodo para obter os estados da API IBGE
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data.map(estado => ({
        id: estado.id,
        UF: estado.sigla,
        Nome: estado.nome,
        Label: estado.sigla + ' - ' + estado.nome
      }));
      this.setEstado();
    })
  }

  //Obtem os municipios de um estado selecionado pelo usuário
  consultaMunicipios(estadoSelect:any){
    this.siglaUF = estadoSelect.UF;
    this.municipioEstadoService.getMunicipios(this.siglaUF).subscribe(data => {
      this.municipios = data.map(nomeMunicipio => ({
        id: nomeMunicipio.id,
        name: nomeMunicipio.nome
      }));
      this.setCidadeEstado()
    })
  } 

  //Obtem a cidade que o usuário seleciona
  onCidadeSelecionada(event: any){
    this.cidadeSelecionada = event.value;
    this.cidadeSelecionadaValue.emit(this.cidadeSelecionada);
  }

  //Obtem o estado que o usuário selecionou
  onEstadoSelecionado(event: any){
    const estadoSelect = event.value;
    this.estadoSelecionado = event.value;
    this.estadoSelecionadoValue.emit(this.estadoSelecionado);
    this.consultaMunicipios(estadoSelect)
  }

  //Selecionar o estado padrão selecionada na definição do componente
  setEstado(){
    if(this.estadoPadrao != null){
      const valorIndice = this.estados.findIndex(estado => estado.UF === this.estadoPadrao)
      if(valorIndice == -1){
        alert("Estado não encontrado, por favor verifique o nome digitado e acentuação")
      }else{
        this.estadoPadraoSelecionado = this.estados[valorIndice]
      }
    }
  }

  //Seleciona qual cidade padrão do estado foi definido no componente
  setCidadeEstado(){
    if(this.cidadePadrao != null){
      const valorIndice = this.municipios.findIndex(municipio => municipio.name === this.cidadePadrao)
      if(valorIndice == -1){
        alert("Cidade não encontrada, por favor verifique o nome digitado e acentuação")
      }else{
        this.cidadePadraoSelecionado = this.municipios[valorIndice]
      }
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
