import { Component, OnInit} from '@angular/core';
import { Ticket } from 'src/app/domain/ticket.model';
import { TicketService } from '../../../services/ticket.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReloadService } from 'src/app/services/reload.service';
import { Factura } from '../../../domain/factura.model';
import { Persona } from 'src/app/domain/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { FacturaService } from 'src/app/services/factura.service';
import { Lugar } from 'src/app/domain/lugar.model';
import { LugarService } from 'src/app/services/lugar.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-factura',
  templateUrl: './create-factura.component.html',
  styleUrls: ['./create-factura.component.scss']
})
export class CreateFacturaComponent implements OnInit{
  factura: Factura = {};
  cliente: Persona = {};
  ticket: Ticket= {};

  clientes: Persona[]=[];
  tickets: Ticket[]=[];

  selectedTicketId: number= 0;
  selectedClienteId: number= 0;

  fechaActual: string | undefined;
  horaActual: string | undefined ;

  horaIngreso: string | undefined ;
  valorTarifa: number | undefined ;
  horasDif: number =0 ;
  iva: number =0 ;
  subtotal: number =0 ;
  total: number =0 ;

  fechaST: string | undefined ;

  horaST: string | undefined ;

  pagarST: string | undefined ;
  totalST: string | undefined ;




  constructor(
    private datePipe: DatePipe,
    private facturaService: FacturaService,
    private ticketService: TicketService,
    private personaService: PersonaService,
    private lugarService: LugarService,
    private _snackBar: MatSnackBar,
    private reloadService: ReloadService,
    private sharedService: DataSharingService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.actualizarListas();
  }


  actualizarListas(){

    this.ticketService.getAll().subscribe((tickets: Ticket[]) => {
      let ticketsFiltrado = tickets.filter(ticket => ticket.estado === 'P');
      this.tickets = ticketsFiltrado;
    });

    this.personaService.getAll().subscribe((personas: Persona[]) => {
      let personasFiltrado = personas.filter(persona => persona.tipo === 'C');
      this.clientes = personasFiltrado;
    });
  }

  updateDateTime() {
    const now = new Date();
    this.fechaActual = this.datePipe.transform(now, 'yyyy-MM-dd') as string;
  this.horaActual = this.datePipe.transform(now, 'HH:mm:ss') as string;
  }

  onTicketChange(ticketId: number) {
    const selectedTicket = this.tickets.find(ticket => ticket.ticketid === ticketId);
    if (selectedTicket) {
      this.ticket = selectedTicket;
    }
    this.horaIngreso=selectedTicket?.hora_entrada;
    this.valorTarifa=selectedTicket?.tarifa?.costoTarifa;
    this.updateDateTime();
    let fecha_sin_Z = selectedTicket?.fecha?.replace("Z", "")
    this.horasDif=this.getDiferenciaDeHoras(this.horaIngreso!,this.horaActual!,fecha_sin_Z!,this.fechaActual!);
   // console.log('DIfff'+ this.horasDif);

    this.iva=(this.valorTarifa!*this.horasDif)*0.12;

    this.subtotal=(this.valorTarifa!*this.horasDif);

    this.total=(this.subtotal+this.iva);

    this.fechaST="Ingreso: "+fecha_sin_Z+" "+this.horaIngreso+"\t\t\t\t-\t\t\t\tSalida: "+this.fechaActual+" "+this.horaActual;

    this.horaST="Horas Estacionado: "+this.horasDif.toFixed(2)+"\t\t\t\t\t\t-\t\t\t\tTarifa Por Hora: $"+this.valorTarifa!.toFixed(2);

    this.pagarST="IVA: $"+this.iva.toFixed(2)+"\t\t\t\t\t\t\t\t\t-\t\t\t\tSubtotal: $"+this.subtotal!.toFixed(2);

    this.totalST="$"+this.total.toFixed(2);

  }

  getDiferenciaDeHoras(time1: string, time2: string, dateA: string, dateB: string): number {
    // Convertir las cadenas de texto a objetos de fecha
    const date1 = new Date(`${dateA}T${time1}`);
    const date2 = new Date(`${dateB}T${time2}`);

    // Calcular la diferencia en milisegundos
    const differenceInMs = date2.getTime() - date1.getTime();

    // Convertir la diferencia a horas con fracciones decimales
    const differenceInHours = differenceInMs / (1000 * 60 * 60);

    return differenceInHours;
  }

  onClienteChange(personaId: number) {
    const selectedCliente = this.clientes.find(persona => persona.personaid === personaId);
    if (selectedCliente) {
      this.cliente = selectedCliente;
    }
  }


  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }


    this.ticket.hora_salida=this.horaActual;
    this.ticket.estado='C';


    this.factura ={
      fecha: this.fechaActual,
      iva: this.iva,
      subtotal: this.subtotal,
      total:this.total,
      persona: this.cliente,
      ticket: this.ticket
    }


    this.sharedService.changeFactura(this.factura);

    this.facturaService.save(this.factura).subscribe(
      response => {

          this._snackBar.open('Factura creada con éxito', 'Cerrar', {
            duration: 5000,
          });

          //console.log(response);

          this.sharedService.changeNumFactura(response.facturaId);

          this.cambiarEstado();
         // this.ticket = { cedula: '',nombre: '',telefono: '',direccion: '',correo: '',tipo: 'E' };
          //this.router.navigate(['list-persona']);
      },
      error => {
        this._snackBar.open(`Error al crear Factura: ${error.error}`, 'Cerrar', {
          duration: 5000,
        });
      }
    );

  }

  cambiarEstado(){
    this.ticket.estado="C";
    this.ticket.hora_salida=this.horaActual;

    //console.log(this.ticket);
    this.ticketService.actualizar(this.ticket).subscribe(
      response => {
        console.log('Ticket actuualizado con éxito');
        this.reloadService.reload();
        this.resetForm();

      },
      error => {
        this.reloadService.reload();
       // console.log(error);

        console.log(`Error al Acualizar Estado de Ticket: ${error.error}`);

        this.resetForm();

        // this._snackBar.open(`Error al Acualizar Estado de Ticket: ${error.error}`, 'Cerrar', {
        //   duration: 5000,
        // });
        //return;
      }
    );

    const lugar: Lugar=this.ticket.lugar!;

    lugar.estado='A';

    //  console.log(lugar);


    this.lugarService.actualizar(lugar).subscribe(
      response => {
        console.log('Lugar actuualizado con éxito');


      },
      error => {
        this._snackBar.open(`Error al Acualizar Estado de Lugar: ${error.error}`, 'Cerrar', {
          duration: 5000,
        });
        return;
      }
    );


    this.reloadService.reload();
    this.resetForm();
  }

  resetForm() {


    this.actualizarListas();
    this.ticket = {};
    this.cliente = {};
    this.factura = {};
    this.selectedTicketId = 0;
    this.selectedClienteId = 0;
    this.pagarST = undefined;
    this.fechaST = undefined;
    this.horaST = undefined;
    this.totalST = undefined;

    this.router.navigate(['pdf-factura']);

  }



}
