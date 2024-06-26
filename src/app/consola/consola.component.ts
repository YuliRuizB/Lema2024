import { Component, signal, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styleUrl: './consola.component.scss'
})
export class ConsolaComponent {
  user: any;
  client:any[] =[];
  salones: salonesTable[] = [];
  readonly panelOpenState = signal(false);

  constructor(private router: Router, 
    public authService: AuthenticationService,
    private usersService: UsersService) { 

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1; 
            this.usersService.getGradebyCustomer(this.user.claveCliente).subscribe((data: any) => {        
              this.salones = data;          
            });           
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


export interface salonesTable {
  active: string;
  description: string;
  claveGrado: string;
  claveCliente:string;
  name:string;
  studentsTotal:string; 
}