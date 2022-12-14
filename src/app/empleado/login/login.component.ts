import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/servicio/empleado.service';
import { Empleado } from 'src/app/modelo/empleado';
import { faker } from '@faker-js/faker';
import { ToastrService } from 'ngx-toastr'
import { Usuario } from 'src/app/modelo/usuario';
import api from 'src/config/config';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})




export class LoginComponent implements OnInit {




  empleado: Empleado[] = [];
  
  constructor(
    public toastr: ToastrService,
    public postService: EmpleadoService,
    private router: Router,
    
 
  ) { }

  ngOnInit(): void {

    localStorage.setItem('nuevo', 'sebas----->');
    Array.from({ length: 10 }).forEach(() => {
      this.empleado.push(createRandomUser());

    });
    this.postService.getAll().subscribe((data: Empleado[]) => {
      this.empleado = data;

    });

    console.log(this.empleado)
  }


 

  element: boolean = true;
  async ingreso(correo: string, pass: string) {

    var ejemplo= new Usuario(correo, pass);

  
    api.post('Usuario/', { usuario: correo, contrasena: pass })
      .then((response:any) => {
        if (response.status === 200) {



          localStorage.setItem('idUsuario', response.data.userdata[0].id_usuario);
          console.log()
          this.toastr.success('al sistema', 'Bienvenido', {
            timeOut: 3000,
          });

          if(response.data.userdata[0].tipo_empleado===1){

            this.router.navigateByUrl('historial');
            
          }else if(response.data.userdata[0].tipo_empleado===2){
            this.router.navigateByUrl('marcaje');
          }
         
          

        } else {
          this.toastr.error('al sistema', 'Alli te encargo', {
            timeOut: 3000,
          });
    }
      });
        
  }


  registra(){
    this.router.navigateByUrl('registrar');
  }
 
}

function foreach(arg0: Empleado) {
  throw new Error('Function not implemented.');
}



const USERS: Empleado[] = [];

function createRandomUser(): Empleado {
  return {
    id_empleado: faker.datatype.uuid(),
    nombres: faker.internet.userName(),
    dpi: faker.internet.email(),
    apellidos: faker.image.avatar(),
    contrasena: faker.internet.password(),

  };
}
