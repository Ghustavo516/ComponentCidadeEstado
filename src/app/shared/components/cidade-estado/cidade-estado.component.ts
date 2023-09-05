
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { DxiFieldModule } from 'devextreme-angular/ui/nested';
import { DxSelectBoxModule } from 'devextreme-angular';
import { CidadeEstadoService } from '../../services/cidade-estado.service';
import { Estado } from 'src/app/model/Estado';
import { observeOn } from 'rxjs';
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
  cidadePadraoSelecionado ?: any[];

  estados: Estado[] = [];
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
      this.estados = [];
      for(let e of data){
        this.estados.push(new Estado(e))
      }
      // this.setEstado();
      console.log(this.estados);
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
        console.log(this.municipios);

        
        //this.setCidadeEstado()
      })
    }
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
    // if(this.estadoPadrao != null){
    //   const valorIndice = this.estados.findIndex(estado => estado.UF === this.estadoPadrao)
    //   if(valorIndice == -1){
    //     alert("Estado não encontrado, por favor verifique o nome digitado e acentuação")
    //   }else{
    //     this.estadoPadraoSelecionado = this.estados[valorIndice]
    //   }
    // }
  }

  //Seleciona qual cidade padrão do estado foi definido no componente
  setCidadeEstado(){
    // if(this.cidadePadrao != null){
    //   const valorIndice = this.municipios.findIndex(municipio => municipio.name === this.cidadePadrao)
    //   const nomeCidade = this.municipios[valorIndice]
    //   this.cidadePadraoSelecionado = nomeCidade
    // }
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
