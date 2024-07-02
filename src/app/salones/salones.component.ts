import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CargaSalonComponent } from './carga-salon/carga-salon.component';
import { CargaAlumnosComponent } from './carga-alumnos/carga-alumnos.component';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss']
})
export class SalonesComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  user: any;
  client:any[] =[];
  displayedColumns: string[] = ['clave', 'grado', 'name', 'description', 'claveCliente'];
  ELEMENT_DATA: salonesTable[] = [];
  dataSource = new MatTableDataSource<salonesTable>(this.ELEMENT_DATA);
  verAlumnosClicked: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
              this.ELEMENT_DATA = data;
              this.dataSource = new MatTableDataSource<salonesTable>(this.ELEMENT_DATA);
            });
        });   
        }                
    });

    }

    configuracion(){
      //this.router.navigate([`/${place}`]);
    }

    verAlumnos(uid:any){  
      console.log(uid);
      this.verAlumnosClicked = true;
     
      
      this.usersService.getStudentsByGrade(uid,this.user.claveCliente).subscribe((data: any) => {       
        console.log(data); 

        const dialogRef = this.dialog.open(CargaAlumnosComponent, {
          width: '800px',
          height: '500px',
          data: data
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });      

        //this.Element_Data_Alumnos = data;
     });    
    }

    borrarSalon(id:any) {
      console.log("borrar" +  id);
    }

    applyFilter(event: any) {
      const filterValue = event.target.value.trim().toLowerCase();
      this.dataSource.filter = filterValue;    
    }

    clearFilter(): void {
      this.dataSource.filter = '';
    }
  
  
  ngOnInit(): void {
  }

  redirectTo(place:string){
    this.router.navigate([`/${place}`]);
  }
  logout() { 
    this.authService.signOut();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  addGrade(){
    const dialogRef = this.dialog.open(CargaSalonComponent, {
      width: '600px',
      height: '400px',
      data: "salon" 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


export interface salonesTable {
  active: string;
  description: string;
  claveGrado: string;
  claveCliente:string;
  name:string;
}
