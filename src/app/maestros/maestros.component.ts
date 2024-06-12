import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {
  user: any;
  client:any[] =[];
  displayedColumns: string[] = ['clave', 'grado', 'name', 'apellidoPaterno', 'apellidoMaterno'];
  ELEMENT_DATA: teacherTable[] = [];
  dataSource = new MatTableDataSource<teacherTable>(this.ELEMENT_DATA);


  constructor(private router: Router, 
    public authService: AuthenticationService,
    private usersService: UsersService) { 

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1;
            this.usersService.getTeachersbyCustomer(this.user.claveCliente).subscribe((data: any) => {        
              this.ELEMENT_DATA = data;
              this.dataSource = new MatTableDataSource<teacherTable>(this.ELEMENT_DATA);
            });         
        });   
        }                
    });

    }

    logout() { 
      this.authService.signOut();
    }  
  ngOnInit(): void {
  }
  configuracion(){
    //this.router.navigate([`/${place}`]);
  }
  clearFilter(): void {
    this.dataSource.filter = '';
  }

  borrarMaestro(id:any) {
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

  redirectTo(place:string){
    this.router.navigate([`/${place}`]);
  }
}

export interface teacherTable {
  active: string;
  name: string;
  claveGrado: string;
  claveCliente:string;
  apellidoPaterno:string;
  apellidoMaterno:string;
  urlPhoto:string;
}
