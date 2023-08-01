import { Tarifa } from 'src/app/domain/tarifa.model';
import { Vehiculo } from './../../../domain/vehiculo.model';
import { Component, OnInit} from '@angular/core';
import { Ticket } from 'src/app/domain/ticket.model';
import { TarifaService } from 'src/app/services/tarifa.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticket: Ticket = {};
  vehiculo: Vehiculo ={};
  placas: Vehiculo[] = [];
  tiposVehiculo: string[] = [];
  hasSelection = false;

  constructor(
    private vehiculoService: VehiculoService,
    private tarifaService: TarifaService
  ) { }

  ngOnInit() {
    this.vehiculoService.getAll().subscribe((data: Vehiculo[]) => {
      console.log("*****"+data);
      this.placas = data;
    });

    this.tarifaService.getAll().subscribe(data => {


      this.tiposVehiculo = data.map((tarifa: Tarifa) => tarifa.tipoVehiculo);
    });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedVehicle = this.placas.find(vehicle => vehicle.placa === event.option.value);
    if (selectedVehicle) {
      this.vehiculo.tipoVehiculo = selectedVehicle.tipoVehiculo;
    }
  }

  onSelectionChange($event: { value: any; }) {
    if($event.value) {
      this.hasSelection = true;
    } else {
      this.hasSelection = false;
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
