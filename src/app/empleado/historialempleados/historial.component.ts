import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelo/empleado';
import { Horario } from 'src/app/modelo/horario';
import { EmpleadoService } from 'src/app/servicio/empleado.service';
import { faker } from '@faker-js/faker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import api from 'src/config/config';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.sass'],
})

export class HistorialComponent implements OnInit {


  empleado: Empleado[] = [];
  horario: Horario[] = [];
  dato: string = '';

  constructor(
    public toastr: ToastrService,
    public postService: EmpleadoService,
    private router: Router) { }

  async ngOnInit() {

    // Array.from({ length: 10 }).forEach(() => {
    //   this.empleado.push(createRandomUser());

    // });


    // Array.from({ length: 11 }).forEach(() => {
    //   this.horario.push(createRandomUse());

    // });


    // Código cuando Storage NO es compatible
    //  var dato=localStorage.getItem('nuevo');
    //  console.log(dato);


    await this.ingreso();
  


  }


  nombreCompleto:string ="";
  horarios: boolean = false;
  personas: boolean = true;
  mensaje: boolean = true;

  async ingreso() {


    api.get('empleado/todo', {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.empleado = response.data;


      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });
  }


  showSuccess() {
    this.toastr.success('everything is broken', 'Major Error', {
      timeOut: 3000,
    });
  }

  async borrar(id: string) {

    console.log(id)
    api.post('empleado/eliminar/'+id, {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.ingreso()

      
      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });
  }

  editar(id: string) {
    console.log(id + "-----aqui");
  }

async  verHorarios(id: string, nombres: string, apellidos: string) {
  this.nombreCompleto=nombres+" "+apellidos;
  console.log(id)
    api.get('historial/historial/'+id, {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.horario = response.data;

        this.personas=false;
        this.horarios=true;
      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });

  }

  salir() {
    this.router.navigateByUrl('');
  }



  regresar(){
    this.personas=true;
    this.horarios=false;

  }
}



// const HORARIO: Horario[] = [];
// const EMPLEADO: Empleado[] = [];

// function createRandomUser(): Empleado {
//   return {
//     id_empleado: faker.datatype.uuid(),
//     nombres: faker.name.fullName(),
//     dpi: faker.internet.email(),
//     apellidos: faker.name.firstName(),
//     contrasena: faker.internet.password(),

//   };
// }


// function createRandomUse(): Horario {
//   return {
//     fecha: faker.date.weekday() + "",
//     hora: faker.date.birthdate() + "",
//     se: faker.date.birthdate() + ""
//   }
// }
