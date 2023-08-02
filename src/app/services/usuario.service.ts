import { Usuario } from 'src/app/domain/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  save(Usuario: Usuario) {
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Usuarios/registrar", Usuario);
  }
  public registrarUsuarios(cargo: string, contrasenia: string, usuario: string,persona_id: string) {
    const url = "http://localhost:8080/Proyecto-Plataformas/rs/Usuarios/registrar";
    const usuarioData = {
      cargo: cargo,
      contrasenia: contrasenia,
      usuario: usuario,
      persona_id: persona_id
    };
    return this.http.post(url, usuarioData);
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Usuarios/listar")
  }

  eliminar(Usuario: Usuario){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Usuarios/eliminar", { body: Usuario });
  }

  actualizar(Usuario: Usuario){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Usuarios/actualizar", Usuario);
  }

}

