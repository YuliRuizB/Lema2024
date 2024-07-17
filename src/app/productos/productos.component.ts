import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CargaProductoComponent } from './carga-producto/carga-producto.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  user: any;
  client:any[] =[];
  displayedColumns: string[] = ['name', 'amount','date_from','type','claveCliente'];
  ELEMENT_DATA: productosTable[] = [];
  dataSource = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly panelOpenStaproductosTablete = signal(false);

  
  constructor(private router: Router, 
    public authService: AuthenticationService,
    private usersService: UsersService) { 

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1; 
            this.usersService.getProductsbyCustomer(this.user.claveCliente).subscribe((data: any) => {        
              this.ELEMENT_DATA = data;
              this.dataSource = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
            });        
        });   
        }                
    });

    }
  ngOnInit(): void {
  }
  
  configuracion(){
    //this.router.navigate([`/${place}`]);
  }
  clearFilter(): void {
    this.dataSource.filter = '';
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;    
  }


  redirectTo(place:string){
    this.router.navigate([`/${place}`]);
  }
  logout() { 
    this.authService.signOut();
  }

  addProduct(){
    const dialogRef = this.dialog.open(CargaProductoComponent, {
      width: '700px',
      height: '500px',
      data: "0" 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  verProducto(id:any){
    console.log(id);
    const dialogRef = this.dialog.open(CargaProductoComponent, {
      width: '700px',
      height: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  borrarProducto(id: any) {

  }


}


export interface productosTable {
  active: string;
  amount: number;
  claveCliente:string;
  name:string;
  date_from:Date;
  date_to:Date;
  type:string;  
  date_created:Date;
  uid:string;
}
