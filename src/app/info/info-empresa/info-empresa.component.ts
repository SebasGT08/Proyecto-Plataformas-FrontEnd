import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.scss']
})
export class InfoEmpresaComponent implements OnInit {
  usuario = "Juan";
  fecha = new Date();
  gananciasCarros: number = 0;
  gananciasMotos: number = 0;
  gananciasCamiones: number = 0;
  carrosEstacionados: number| undefined;
  motosEstacionadas: number| undefined;
  camionesEstacionados: number| undefined;
  tiempoPromedio: number| undefined;

  constructor() {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
  }
  ngOnInit() {
    this.gananciasCarros = this.obtenerGananciasCarros();
    this.gananciasMotos = this.obtenerGananciasMotos();
    this.gananciasCamiones = this.obtenerGananciasCamiones();
    this.carrosEstacionados = this.obtenerCarrosEstacionados();
    this.motosEstacionadas = this.obtenerMotosEstacionadas();
    this.camionesEstacionados = this.obtenerCamionesEstacionados();
    this.tiempoPromedio = this.obtenerTiempoPromedio();
  }

  obtenerGananciasCarros(): number {
    // Aquí es donde obtendrías las ganancias de los carros desde tu servicio
    return 0;
  }

  obtenerGananciasMotos(): number {
    // Aquí es donde obtendrías las ganancias de las motos desde tu servicio
    return 0;
  }

  obtenerGananciasCamiones(): number {
    // Aquí es donde obtendrías las ganancias de los camiones desde tu servicio
    return 0;
  }

  obtenerCarrosEstacionados(): number {
    // Aquí es donde obtendrías la cantidad de carros estacionados desde tu servicio
    return 0;
  }

  obtenerMotosEstacionadas(): number {
    // Aquí es donde obtendrías la cantidad de motos estacionadas desde tu servicio
    return 0;
  }

  obtenerCamionesEstacionados(): number {
    // Aquí es donde obtendrías la cantidad de camiones estacionados desde tu servicio
    return 0;
  }

  obtenerTiempoPromedio(): number {
    // Aquí es donde obtendrías el tiempo promedio de estacionamiento desde tu servicio
    return 0;
  }
}
