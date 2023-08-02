import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../domain/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  constructor(private http: HttpClient) { }
  save(factura: Factura){
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Facturas/registrar", factura)
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Facturas/listarFacturas")
  }

  eliminar(factura: Factura){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Facturas/eliminar", { body: factura });
  }

  actualizar(factura: Factura){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Facturas/actualizar", factura);
  }
}
