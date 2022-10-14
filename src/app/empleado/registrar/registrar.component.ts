import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import api from 'src/config/config';
import { Router } from '@angular/router';

interface Registrar {
  name: String,
  email: String,
  password: String,
  password_confirmation: String

}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})

export class RegistrarComponent implements OnInit {

  constructor(
    public toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {

  }




  async registro(nombre: string, apellido: string, usuario: string, password: string, confirmaPassword: string, dpi:string) {

    console.log(confirmaPassword);
    api.post('Usuario/registro', { nombre: nombre, apellido: apellido, usuario: usuario, contrasena: password, dpi:dpi })
      .then((response: any) => {
        if (response.status === 200) {



          this.toastr.success('Por favor ingresa al login', 'Totalmente registrado', {
            timeOut: 3000,
          });

          this.router.navigateByUrl('/');



        } else {
          this.toastr.error('todos los campos solicitados', 'Por favor debes ingresar', {
            timeOut: 3000,
          });
        }
      });



  }

}
