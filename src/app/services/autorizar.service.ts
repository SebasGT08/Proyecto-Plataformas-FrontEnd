import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,of} from 'rxjs';
import { Usuario } from '../domain/usuario.model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AutorizarService {
  private currentUserSubject: BehaviorSubject<Usuario | null>;

  public currentUser: Observable<Usuario | null>;


  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }


   public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8080/Proyecto-Plataformas/rs/Usuarios/login', { usuario: username, contrasenia: password })
      .pipe(
        map(user => {
          // Si la respuesta es exitosa
          if(user && user.usuarioId) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
          // Si la respuesta es un error en el cuerpo de la respuesta
          else if(user && user.codigo == 99) {
            throw new Error(user.mensaje);
          }
        }),
        catchError(error => {
          // Capturando errores HTTP
          this.logout();
          if (error.status === 400) {
            this.snackBar.open('Error al iniciar sesión: Credenciales de inicio de sesión inválidas.', 'Cerrar', { duration: 5000 });
          }
          else {
            this.snackBar.open('Ocurrió un error inesperado. Por favor intente de nuevo.', 'Cerrar', { duration: 5000 });
          }
          // En este caso, dado que estamos manejando el error, necesitamos retornar un observable que complete,
          // en lugar de lanzar un error. Podemos hacer esto con of(null).
          return of(null);
        })
      );
  }


  logout() {
    // Elimina al usuario del almacenamiento local para cerrar la sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
