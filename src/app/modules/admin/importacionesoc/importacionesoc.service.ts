import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OCResult } from './importacionesoc.type';



const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
  // , observe: 'body', reportProgress: true };
};

@Injectable({
  providedIn: 'root'
})
export class ImportacionesocService {

private baseUrl = environment.baseUrl + '/api/ImportacionesOc/';
private _httpClient = inject(HttpClient);

  
constructor() { }




getRubros(): Observable<any[]> {
  return this._httpClient.get<any[]>(  `${this.baseUrl}Listar-Rubros`  , httpOptions);  
}

getFamilias(rubro: any): Observable<any[]> {
  return this._httpClient.get<any[]>(`${this.baseUrl}Listar-Familia/${rubro}`, httpOptions);
}

getSubfamilias(familia: any): Observable<any[]> {
  return this._httpClient.get<any[]>(`${this.baseUrl}Listar-SubFamilia/${familia}`, httpOptions);
}

getOcs(parametros: any): Observable<OCResult[]> {

  if(parametros.sku === ''){
    parametros.sku = null;
  }
  
  if(parametros.NumOrdenCompra === ''){
    parametros.NumOrdenCompra = null;
  }

  return this._httpClient.post<OCResult[]>(`${this.baseUrl}Listar-Ocs`, parametros , httpOptions);
}

getDetalleOC(numoc: any): Observable<any[]> {
  return this._httpClient.get<any[]>(`${this.baseUrl}Obtener-DetalleOC/${numoc}`, httpOptions);
}



}
