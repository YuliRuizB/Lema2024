import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UsersService } from '../shared/services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { productosTable } from '../productos/productos.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  user: any;
  client:any[] =[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['displayName', 'productName', 'amount', 'charge_type', 'date_created'];
  displayedColumnsS: string[] = ['claveGrado','displayName', 'productName', 'amount', 'charge_type', 'date_created'];
  displayedColumnsM: string[] = ['date_created','claveGrado','displayName', 'productName', 'amount', 'claveCliente'];
  ELEMENT_DATA: productosTable[] = [];
  dataSourceG = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
  dataSourceS = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
  dataSourceM = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
  acumuladoMes:any;
  months = [
    { value: '01', viewValue: 'Enero' },
    { value: '02', viewValue: 'Febrero' },
    { value: '03', viewValue: 'Marzo' },
    { value: '04', viewValue: 'Abril' },
    { value: '05', viewValue: 'Mayo' },
    { value: '06', viewValue: 'Junio' },
    { value: '07', viewValue: 'Julio' },
    { value: '08', viewValue: 'Agosto' },
    { value: '09', viewValue: 'Septiembre' },
    { value: '10', viewValue: 'Octubre' },
    { value: '11', viewValue: 'Noviembre' },
    { value: '12', viewValue: 'Diciembre' }
  ];
  constructor(private router: Router,   
    private snackBar: MatSnackBar,
    public authService: AuthenticationService,
    private usersService: UsersService) {    

      this.authService.user.subscribe( (user) => {
        this.user = user;      
        if(this.user != null){
        
          this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {           
            this.client = data1;     
            this.usersService.getPaymentbyCustomer(this.user.claveCliente).subscribe((data: any) => {        
              this.ELEMENT_DATA = data;
              this.dataSourceG = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
              this.dataSourceM = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
            }); 
        });   
        }                
    });

    }

    onMonthSelected(event: any) {
      const selectedMonth = event.value;
      console.log('Mes seleccionado:', selectedMonth);
       
      const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
      const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);

      console.log('Rango de fechas:', startDate, endDate);

     this.usersService.getPaymentbyDatebyCustomer(this.user.claveCliente, startDate, endDate).subscribe((data: any) => {        
      if (data.length > 0) {
        const totalAmount = data.reduce((total : any, item: any) => total + item.amount, 0);
        console.log(totalAmount);
        this.acumuladoMes = totalAmount;
    
        this.ELEMENT_DATA = data;
        this.dataSourceM = new MatTableDataSource<productosTable>(this.ELEMENT_DATA);
     
      } else {
        this.dataSourceM = new MatTableDataSource<productosTable>([]);
        this.acumuladoMes =0;
        this.notifyUser("No existen pagos en este mes.", "error");
    
      }
      }); 
     }
    private notifyUser(message: string, type: 'info' | 'error' | 'warning') {
      this.showNotification(message, type);
    }
  
    private showNotification(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 5000,
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

  clearFilterPagos(){
    this.dataSourceG.filter = '';
  }

  verPago(id:any){

  }
  borrarPago(id:any){
    
  }

  applyFilterG(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSourceG.filter = filterValue;    
  }


  applyFilterS(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSourceS.filter = filterValue;    
  }


  applyFilterMonth(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSourceM.filter = filterValue;    
  }

  clearFilterSalon(){
    this.dataSourceS.filter = '';
  }

 
}
export interface pagosTable {
  amount: string;
  authorization: string;
  claveGrado: string;
  claveCliente:string;
  charge_type:string;
  claveAlumno:string;
  displayName:string;
  productName:string;
  status:string;  
  date_created:Date;
}
