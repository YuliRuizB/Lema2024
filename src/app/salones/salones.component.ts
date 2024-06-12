import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss']
})
export class SalonesComponent implements OnInit {
  user: any;
  client:any[] =[];
  displayedColumns: string[] = ['clave', 'grado', 'name', 'description', 'claveCliente'];
  ELEMENT_DATA: salonesTable[] = [];
  dataSource = new MatTableDataSource<salonesTable>(this.ELEMENT_DATA);
  verAlumnosClicked: boolean = false;

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
      console.log("ver students id" + uid);
      this.verAlumnosClicked = true;
     
      
      this.usersService.getStudentsByGrade(uid,this.user.claveCliente).subscribe((data: any) => {       
        console.log(data); 
        //this.Element_Data_Alumnos = data;
     });    
    }

    borrarSalon(id:any) {
      console.log("borrar" +  id);
    }

    applyFilter(event: any) {
      const filterValue = event.target.value;
      if (filterValue.length > 0){
          this.dataSource.filter = filterValue.trim().toLowerCase();
      } else {
        console.log(filterValue);
        console.log("filterValue");
      }
    
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

}


export interface salonesTable {
  active: string;
  description: string;
  claveGrado: string;
  claveCliente:string;
  name:string;
}
