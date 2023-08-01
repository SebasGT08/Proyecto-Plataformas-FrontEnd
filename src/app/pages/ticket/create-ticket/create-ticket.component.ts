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

  lugares: Lugar[] = [];
  lugar: Lugar = {};
  selectedLugarId: number= 0;

  fechaActual: string | undefined;
  horaActual: string | undefined ;



  usuario: string | undefined;


  constructor(
    private vehiculoService: VehiculoService,
    private tarifaService: TarifaService,
    private lugarService: LugarService,
    private datePipe: DatePipe
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
      let usuarioReg = userData.usuario;
       this.usuario=usuarioReg;
    }
  }

  updateDateTime() {
    const now = new Date();
    this.fechaActual = this.datePipe.transform(now, 'yyyy-MM-dd') as string;
  this.horaActual = this.datePipe.transform(now, 'HH:mm:ss') as string;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
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


  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    // this.personaService.save(this.persona).subscribe(
    //   response => {
    //     if (response.codigo) { // si response.codigo existe, hay un error
    //       this._snackBar.open(`Error al crear empleado: ${response.mensaje}`, 'Cerrar', {
    //         duration: 2000,
    //       });
    //     } else {
    //       this._snackBar.open('Empleado creado con éxito', 'Cerrar', {
    //         duration: 2000,
    //       });
    //       this.persona = { cedula: '',nombre: '',telefono: '',direccion: '',correo: '',tipo: 'E' };
    //       //this.router.navigate(['list-persona']);
    //     }
    //   },
    //   error => {
    //     this._snackBar.open(`Error al crear empleado: ${error}`, 'Cerrar', {
    //       duration: 2000,
    //     });
    //   }
    // );
  }
}
