import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { VerNotificacionComponent } from './ver-notificacion/ver-notificacion.component';
import { NuevaNotificacionComponent } from './nueva-notificacion/nueva-notificacion.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  user: any;
  client:any[] =[];
  nPagos:number = 0;
  nNoticias:number = 0;
  nAvisos: number = 0;
  nLogros: number = 0;
  nEmergencia:number =0;
  notifyPayments: notifyTable[] = [];
  notifyNews: notifyTable[] = [];
  notifyAvisos: notifyTable[] = [];    
  notifyLogros: notifyTable[] = [];
  notifyEmergency: notifyTable[] = [];
  readonly dialog = inject(MatDialog);
  readonly panelOpenState = signal(false);

  constructor(private router: Router, 
    public authService: AuthenticationService,
    private usersService: UsersService) { 

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1;  
            this.usersService.getNotifybyCustomer(this.user.claveCliente).subscribe((data: any) => {                     
              this.tablasNotify(data);
            });         
        });   
        }                
    });

    }

    tablasNotify(data:any) {
      console.log(data);
      // Clear the arrays before assigning new data
      this.notifyPayments = [];
      this.notifyNews = [];  
      this.notifyAvisos = [];
      this.notifyLogros = [];
      this.notifyEmergency = [];
      
      // Iterate over the data and assign to respective arrays
       data.forEach((item:any) => {
        console.log(item.notify_Type);
        if (item.notify_Type === "1") {
          this.nPagos += 1;
          this.notifyPayments.push(item); 
        } else if (item.notify_Type === "2") {
          this.nNoticias += 1;
          this.notifyNews.push(item);
        }else if (item.notify_Type === "3") {
          console.log(item);
          this.nAvisos += 1;
          this.notifyAvisos.push(item);
        } else if (item.notify_Type === "4") {
          this.nLogros += 1;
          this.notifyLogros.push(item);
        } else if (item.notify_Type === "5") {
          this.nEmergencia += 1;
          this.notifyEmergency.push(item);
        }
      }); 

    }

  ngOnInit(): void {
  }

  redirectTo(place:string){
    this.router.navigate([`/${place}`]);
  }
  logout() { 
    this.authService.signOut();
  }
  configuracion(){
    //this.router.navigate([`/${place}`]);
  }

  addNewNotify(){
    const dialogRef = this.dialog.open(NuevaNotificacionComponent, {
      width: '800px',
      height: '600px',
      data: "nuevo" 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  verNotify(data:any){
    console.log(data);
    const dialogRef = this.dialog.open(VerNotificacionComponent, {
      width: '800px',
      height: '600px',
      data: data 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  borrarNotify(data:any){
   
  }


}

export interface notifyTable {
  active: string;
  date_creation:Date;
  description: string;
  expiredDate:Date;
  claveGrado: string;
  claveCliente:string;
  claveAlumno:string;
  subTitle:string; 
  title:string;
  notify_Type:string;
  imageURL:string;
  startDate:Date;
  repeatAtDay:number;
  uid:string;
}