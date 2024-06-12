import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {
  user: any;
  client:any[] =[];

  constructor(private router: Router, 
    public authService: AuthenticationService,
    private usersService: UsersService) { 

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1;         
        });   
        }                
    });

    }
  ngOnInit(): void {
  }
  configuracion(){
    //this.router.navigate([`/${place}`]);
  }

  redirectTo(place:string){
    this.router.navigate([`/${place}`]);
  }
  logout() { 
    this.authService.signOut();
  }

}
