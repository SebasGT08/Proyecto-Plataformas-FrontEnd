import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-lugar',
  templateUrl: './info-lugar.component.html',
  styleUrls: ['./info-lugar.component.scss']
})
export class InfoLugarComponent implements OnInit{
  lugar_carros: number = 0;
  lugar_motos: number = 0;
  lugar_camiones: number = 0;


  ngOnInit() {
    this.lugar_carros = this.obtenerDisponibilidadCarros();
    this.lugar_motos = this.obtenerDisponibilidadsMotos();
    this.lugar_camiones = this.obtenerDisponibilidadCamiones();

  }

  obtenerDisponibilidadCarros(): number {
    // Aquí es donde obtendrías las disponibilidad de los carros desde tu servicio
    return 0;
  }

  obtenerDisponibilidadsMotos(): number {
    // Aquí es donde obtendrías las disponibilidad de las motos desde tu servicio
    return 0;
  }

  obtenerDisponibilidadCamiones(): number {
    // Aquí es donde obtendrías las disponibilidad de los camiones desde tu servicio
    return 0;
  }

}
