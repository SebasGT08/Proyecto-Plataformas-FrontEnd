import { Tarifa } from './../../../domain/tarifa.model';
import { Vehiculo } from './../../../domain/vehiculo.model';
import { Component, OnInit} from '@angular/core';
import { Ticket } from 'src/app/domain/ticket.model';
import { TarifaService } from 'src/app/services/tarifa.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Lugar } from 'src/app/domain/lugar.model';
import { LugarService } from 'src/app/services/lugar.service';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/domain/usuario.model';
import { TicketService } from '../../../services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticket: Ticket = {};
  tarifa: Tarifa={};
  tarifas: Tarifa[] = [];
  vehiculo: Vehiculo ={};
  placas: Vehiculo[] = [];
  tiposVehiculo: string[] = [];
  hasSelection = false;
  vehicleSelected = false;

  lugares: Lugar[] = [];
  lugar: Lugar = {};
  selectedLugarId: number= 0;

  fechaActual: string | undefined;
  horaActual: string | undefined ;



  usuarioSt: string | undefined;
  usuario: Usuario | undefined;


  constructor(
    private vehiculoService: VehiculoService,
    private tarifaService: TarifaService,
    private lugarService: LugarService,
    private datePipe: DatePipe,
    private ticketService: TicketService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.vehiculoService.getAll().subscribe((data: Vehiculo[]) => {
      console.log("*****"+data);
      this.placas = data;
    });

    this.tarifaService.getAll().subscribe(data => {

      this.tarifas = data;
      this.tiposVehiculo = data.map((tarifa: Tarifa) => tarifa.tipoVehiculo);
    });

    this.lugarService.getAll().subscribe((data: Lugar[]) => {
      this.lugares = data;
    });

    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000);

    let userObject = localStorage.getItem('currentUser');

    if (userObject) {
      let userData = JSON.parse(userObject);
      this.usuario=userData;
      let usuarioReg = userData.usuario;
       this.usuarioSt=usuarioReg;
    }
  }

  updateDateTime() {
    const now = new Date();
    this.fechaActual = this.datePipe.transform(now, 'yyyy-MM-dd') as string;
  this.horaActual = this.datePipe.transform(now, 'HH:mm:ss') as string;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.vehicleSelected = true;
    const selectedVehicle = this.placas.find(vehicle => vehicle.placa === event.option.value);
    if (selectedVehicle) {
      this.vehiculo.tipoVehiculo = selectedVehicle.tipoVehiculo;
      this.vehiculo.placa = selectedVehicle.placa;
      this.vehiculo.vehiculoId = selectedVehicle.vehiculoId;

      // Actualizamos tarifa
      const selectedTarifa = this.tarifas.find(tarifa => tarifa.tipoVehiculo === selectedVehicle.tipoVehiculo);
      if (selectedTarifa) {
        this.tarifa.tarifaId = selectedTarifa.tarifaId;
        this.tarifa.costoTarifa = selectedTarifa.costoTarifa;
        this.tarifa.tipoVehiculo = selectedTarifa.tipoVehiculo;
      }
    }
  }

  onTipoVehiculoChange(tipo: string) {
    const selectedTarifa = this.tarifas.find(tarifa => tarifa.tipoVehiculo === tipo);
    if (selectedTarifa) {
      this.tarifa.tarifaId = selectedTarifa.tarifaId;
      this.tarifa.costoTarifa = selectedTarifa.costoTarifa;
      this.tarifa.tipoVehiculo = selectedTarifa.tipoVehiculo;
    }
}



  onSelectionChange($event: { value: any; }) {
    if($event.value) {
      this.hasSelection = true;
    } else {
      this.hasSelection = false;
    }
  }


  onLugarChange(lugarId: number) {
    const selectedLugar = this.lugares.find(lugar => lugar.lugarId === lugarId);
    if (selectedLugar) {
      this.lugar = selectedLugar;
    }
  }

  placaExists(placa: string): boolean {
    return this.placas.some(vehicle => vehicle.placa === placa);
  }

  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    // Si el vehículo no ha sido seleccionado de la lista, entonces guardarlo
  if (!this.placaExists(this.vehiculo.placa!)) {
    this.vehiculoService.save(this.vehiculo).subscribe(
      response => {
        console.log('Vehículo guardado con éxito');
        this.vehiculo.vehiculoId=response.vehiculoId
        this.saveTicket();
      },
      error => {
        this._snackBar.open(`Error al crear Vehiculo: ${error.error}`, 'Cerrar', {
          duration: 5000,
        });
        return;
      }
    );
  }else{
    this.saveTicket();
  }

  }
  saveTicket() {
    this.ticket ={
      fecha: this.fechaActual,
      hora_entrada: this.horaActual,
      hora_salida: this.horaActual,
      usuario:this.usuario,
      tarifa: this.tarifa,
      lugar: this.lugar,
      vehiculo: this.vehiculo
    }

    console.log(this.ticket);


    this.ticketService.save(this.ticket).subscribe(
      response => {

          this._snackBar.open('Ticket creado con éxito', 'Cerrar', {
            duration: 5000,
          });

          this.cambiarEstado();
         // this.ticket = { cedula: '',nombre: '',telefono: '',direccion: '',correo: '',tipo: 'E' };
          //this.router.navigate(['list-persona']);
      },
      error => {
        this._snackBar.open(`Error al crear Ticket: ${error.error}`, 'Cerrar', {
          duration: 5000,
        });
      }
    );
}

cambiarEstado(){
  this.lugar.estado="I";
  this.lugarService.actualizar(this.lugar).subscribe(
    response => {
      console.log('Lugar actuualizado con éxito');
    },
    error => {
      this._snackBar.open(`Error al crear Acualizar Estado de Lugar: ${error.error}`, 'Cerrar', {
        duration: 5000,
      });
      return;
    }
  );
}
}
