import { Component, OnInit } from '@angular/core';
import { LugarService } from 'src/app/services/lugar.service';
import { ReloadService } from 'src/app/services/reload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-lugar',
  templateUrl: './info-lugar.component.html',
  styleUrls: ['./info-lugar.component.scss']
})
export class InfoLugarComponent implements OnInit{
  lugar_carros: number = 0;
  lugar_motos: number = 0;
  lugar_camiones: number = 0;
  private reloadSubscription: Subscription | undefined;

  constructor( private lugarService: LugarService,private reloadService: ReloadService) { }

  ngOnInit() {
    this.getData();
    this.reloadSubscription = this.reloadService.reloadObservable.subscribe(() => {
      this.getData();
    });
  }

  ngOnDestroy() {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }

  getData() {
    this.lugarService.getAll().subscribe(lugares => {
      this.lugar_carros = lugares.filter((lugar: { tipoVehiculo: string; estado: string; }) => lugar.tipoVehiculo === 'Carro' && lugar.estado === 'A').length;
      this.lugar_motos = lugares.filter((lugar: { tipoVehiculo: string; estado: string; }) => lugar.tipoVehiculo === 'Moto' && lugar.estado === 'A').length;
      this.lugar_camiones = lugares.filter((lugar: { tipoVehiculo: string; estado: string; }) => lugar.tipoVehiculo === 'Camion' && lugar.estado === 'A').length;
    });
  }

}
