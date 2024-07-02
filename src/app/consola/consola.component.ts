import { Component, signal, ChangeDetectionStrategy, inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { CargaAlumnoComponent } from './carga-alumno/carga-alumno.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styleUrl: './consola.component.scss'
})
export class ConsolaComponent {
  readonly dialog = inject(MatDialog);
  user: any;
  client:any[] =[];
  salones: salonesTable[] = [];
  readonly panelOpenState = signal(false);

  constructor(private router: Router, 
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private usersService: UsersService) { 

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1; 
            this.usersService.getGradebyCustomer(this.user.claveCliente).subscribe((data: any) => {        
              this.salones = data; 
              this.tablasSalones(data);
            });           
        });   
        }                
    });
  }
  tablasSalones(data: any[]) {    
      const now = new Date();
      const dateString = now.toISOString().split('T')[0]; // Obtiene solo la parte de la fecha (YYYY-MM-DD)   
      data.forEach(record => {
      this.usersService.getConsolaPanelInfo(dateString, record.claveGrado,record.claveCliente).subscribe((dataR: any) => {         
       // console.log(dataR);
         // Encuentra el índice del salón correspondiente
         if( dataR != undefined){
          const index = this.salones.findIndex(salon => 
            salon.claveGrado === record.claveGrado && salon.claveCliente === record.claveCliente
          );    
          // Si el salón existe, actualiza su consolaTable
          if (index !== -1) {
            const records: any[] = []; 
            dataR.forEach((recordData: any) => {
              let dataResponse: any = {
                studentName: recordData.studentName,
                gradeName: recordData.gradeName,
                claveGrado: recordData.claveGrado,
                claveCliente: recordData.claveCliente,
                initialTime: recordData.initialTime,
                currentDate: recordData.currentDate
              };
    
              records.push(dataResponse); // Agregar cada registro a records
            });
           
            this.salones[index].consolaTable = { records: records };
            this.salones[index].studentsTotal = dataR.length.toString();
          }

         }
       
      }); 
    })
 //   console.log(this.salones);
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

  cargaAlumno() {
    const dialogRef = this.dialog.open(CargaAlumnoComponent, {
      width: '1000px',
      height: '600px',
      data: "Ingreso" 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
  cargaAlumnoSalida() {
    const dialogRef = this.dialog.open(CargaAlumnoComponent, {
      width: '1000px',
      height: '600px',
      data: "Salida" 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formatTime(initialTime: string): string {
    if (!initialTime) {
      return ''; // Handle null or undefined input gracefully
    }
   // Parse the initialTime string into a Date object
   const date = new Date(initialTime);
   // Use Angular's DatePipe to format the time
   const formattedTime = this.datePipe.transform(date, 'h:mm a');
   return formattedTime || ''; // Return an empty string if formattedTime is null or undefined
 }

 getFechaActualFormateada(): string {
      const today = new Date();
      const formattedDate = this.datePipe.transform(today, 'EEEE, d \'de\' MMMM \'de\' yyyy', 'es');
      return formattedDate ?? ''; 
    }


}



export interface salonesTable {
  active: string;
  description: string;
  claveGrado: string;
  claveCliente:string;
  name:string;
  consolaTable :consolaTable;
  studentsTotal:string; 
}
export interface consolaTable {
  records: {
    studentName: string;
    gradeName: string;
    claveGrado: string;
    claveCliente: string;
    initialTime: string;
    currentDate: string;
  }[];
}