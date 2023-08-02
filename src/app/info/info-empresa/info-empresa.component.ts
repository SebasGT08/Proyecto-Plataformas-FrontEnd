import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/domain/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { ReloadService } from 'src/app/services/reload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.scss']
})
export class InfoEmpresaComponent implements OnInit {
  usuario = '';
  fecha = new Date();
  gananciasCarros: number = 0;
  gananciasMotos: number = 0;
  gananciasCamiones: number = 0;
  carrosEstacionados: number= 0;
  motosEstacionadas: number= 0;
  camionesEstacionados: number= 0;
  tiempoPromedio: number| undefined;
  totalVehiculos: number =0;
  private reloadSubscription: Subscription | undefined;

  constructor(private ticketService: TicketService,private reloadService: ReloadService) {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
  }
  ngOnInit() {
    this.getData();
    this.reloadSubscription = this.reloadService.reloadObservable2.subscribe(() => {
      this.getData();
    });

  }

  ngOnDestroy() {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }


  getData() {
    this.gananciasCarros = this.obtenerGananciasCarros();
    this.gananciasMotos = this.obtenerGananciasMotos();
    this.gananciasCamiones = this.obtenerGananciasCamiones();
    this.carrosEstacionados = this.obtenerCarrosEstacionados();
    this.motosEstacionadas = this.obtenerMotosEstacionadas();
    this.camionesEstacionados = this.obtenerCamionesEstacionados();
    this.tiempoPromedio = this.obtenerTiempoPromedio();
    this.totalVehiculos=this.obtenerVehiculosEstacionadosHoy();

    let userObject = localStorage.getItem('currentUser');

    if (userObject) {
      let userData = JSON.parse(userObject);
      let usuarioReg = userData.usuario;
       this.usuario=usuarioReg;
    }
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

    this.ticketService.getAll().subscribe((tickets: Ticket[]) => {
      let carros = tickets.filter(ticket => ticket.estado === 'P' && ticket.vehiculo?.tipoVehiculo === 'Carro');
      this.carrosEstacionados = carros.length | 0;
    });
    return this.carrosEstacionados;
  }


  obtenerMotosEstacionadas(): number {
    this.ticketService.getAll().subscribe((tickets: Ticket[]) => {
      let motos = tickets.filter(ticket => ticket.estado === 'P' && ticket.vehiculo?.tipoVehiculo === 'Moto');
      this.motosEstacionadas = motos.length | 0;
    });
    return this.motosEstacionadas;
  }

  obtenerCamionesEstacionados(): number {
    this.ticketService.getAll().subscribe((tickets: Ticket[]) => {
      let camiones = tickets.filter(ticket => ticket.estado === 'P' && ticket.vehiculo?.tipoVehiculo === 'Camion');
      this.camionesEstacionados = camiones.length | 0;
    });
    return this.camionesEstacionados;
  }

  obtenerVehiculosEstacionadosHoy(): number {

    let fechaActualFormato=this.obtenerFechaFomateda()+'Z';
    console.log(fechaActualFormato);

    this.ticketService.getAll().subscribe((tickets: Ticket[]) => {
      let vehiculosHoy = tickets.filter(ticket =>  ticket.fecha === fechaActualFormato);
      this.totalVehiculos = vehiculosHoy.length | 0;
    });

    return this.totalVehiculos;
}

  obtenerTiempoPromedio(): number {
    // Aquí es donde obtendrías el tiempo promedio de estacionamiento desde tu servicio
    return 0;
  }

  obtenerFechaFomateda():String{
    let fechaActual = new Date();
    let anio = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // getMonth() devuelve valores de 0 a 11
    let dia = fechaActual.getDate();

    // Aseguramos que siempre haya dos dígitos en mes y dia.
    let mesFormato = mes < 10 ? '0' + mes : '' + mes;
    let diaFormato = dia < 10 ? '0' + dia : '' + dia;

    return `${anio}-${mesFormato}-${diaFormato}`;
  }
}
