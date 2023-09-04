import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/model/Cidade';
import { Estado } from 'src/app/model/Estado';

@Injectable({
  providedIn: 'root'
})
export class CidadeEstadoService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
  }

  getMunicipios(siglaUF: string): Observable<Cidade[]>{
    return this.http.get<Cidade[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + siglaUF + '/municipios?orderBy=nome')
  }
}
