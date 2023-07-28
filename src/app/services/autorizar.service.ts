import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,of} from 'rxjs';
import { Usuario } from '../domain/usuario.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorizarService {
  private currentUserSubject: BehaviorSubject<Usuario | null>;

  public currentUser: Observable<Usuario | null>;


  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }


   public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>('http://localhost:8080/Practica_web/rs/usuarios/login', { user: username, contrasenia: password })
  //     .pipe(map(user => {
  //       // Almacena los detalles del usuario y el token JWT en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la página
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       return user;
  //     }));
  // }

  login(username: string, password: string) {
    const correctUsername = 'test';
    const correctPassword = 'test';

    if (username === correctUsername && password === correctPassword) {
      const fakeUser: Usuario = {
        id: 1,
        persona_id: 1,
        cargo: 'Test cargo',
        user: username,
        contrasenia: password
      };

      return of(fakeUser).pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
    } else {
      // Si el nombre de usuario o la contraseña no son correctos, emitir un error.
      return throwError('Usuario o contraseña incorrectos');
    }
  }


  logout() {
    // Elimina al usuario del almacenamiento local para cerrar la sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
