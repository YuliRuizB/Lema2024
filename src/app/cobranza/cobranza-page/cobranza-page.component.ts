import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UsersService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-cobranza-page',
  templateUrl: './cobranza-page.component.html',
  styleUrl: './cobranza-page.component.scss'
})
export class CobranzaPageComponent {
  user: any;
  client:any[] =[];

  readonly panelOpenState = signal(false);

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


  configuracion(){
    //this.router.navigate([`/${place}`]);
  }
  ngOnInit(): void {
  }

  redirectTo(place:string){
    this.router.navigate([`/${place}`]);
  }
  logout() { 
    this.authService.signOut();
  }



}
