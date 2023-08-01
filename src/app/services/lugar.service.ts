import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from '../domain/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class LugarService {


  constructor(private http: HttpClient) { }
  save(lugar: Lugar){
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Lugares/registrar", lugar)
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Lugares/listarLugares")
  }

  eliminar(lugar: Lugar){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Lugares/eliminar", { body: lugar });
  }

  actualizar(lugar: Lugar){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Lugares/actualizar", lugar);
  }
}
