import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../shared/services/usuarios.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lte } from 'lodash';

@Component({
  selector: 'app-carga-alumno',
  templateUrl: './carga-alumno.component.html',
  styleUrl: './carga-alumno.component.scss'
})
export class CargaAlumnoComponent {
  userService = inject(UsersService);
  alumnosData: any = [];
  alumnosDataR: any = [];
  user: any;
  infoData:any;
  nombre:any = "";
  AP:any = "";
  AM:any = "";
  Parentesco:any = "";
  photoURL:any = "";
  cardValue:boolean = false;
  constructor(
    public authService: AuthenticationService,
    private snackBar: MatSnackBar,
     public dialogRef: MatDialogRef<CargaAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInicial: any,){

  }
  ngOnInit() {
    console.log(this.dataInicial);  
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user; 
      }
    }); 
  }  
  onEnter(value: string) {
    const value2 = "t5l9LuhZuyWGlCPGIYYCV6gehjK2";
 //   console.log('Hola. El valor es:', value);
    this.userService.getUserInfoByID(value2).subscribe((data: any) => {  
     // this.infoData = data;    
     if(data != undefined){
        this.nombre = data[0].name;
        this.AP = data[0].apellidoPaterno;
        this.AM = data[0].apellidoMaterno;
        this.Parentesco = data[0].parentesco;
        this.photoURL = data[0].photoURL;
        this.cardValue= true;
     }
     
    });
    this.userService.getAlumnosConsole(this.user.claveCliente,value2 ).subscribe((data: any) => {  
      if (this.dataInicial =="Ingreso"){
        const now = new Date();
        const dateString = now.toISOString().split('T')[0];
        const records: any[] = [];        
         console.log(data);
        this.alumnosData = data;
      } else {
        const now = new Date();
        const dateString = now.toISOString().split('T')[0];
        const records: any[] = [];
        data.forEach((record: any) => {         
          this.userService.getConsolaPanelInfoByStudent(dateString,  record.claveGrado,record.claveCliente,record.id).subscribe((dataR: any) => {                     
            if (dataR != undefined && dataR.length > 0){                    
              let registroUnico: any = {
                id:  dataR[0].id,
                photoURL: dataR[0].photoURL,
                nombre: dataR[0].nombre,
                apellidoPaterno: dataR[0].apellidoPaterno,
                apellidoMaterno: dataR[0].apellidoMaterno
              };
              const existeRegistro = this.alumnosData.some((alumno: any) => alumno.id === registroUnico.id);
              // Si no existe, agregarlo a this.alumnosData
              if (!existeRegistro) {
                this.alumnosData.push(registroUnico);
              } 
            }         
          })             
        })
      }
    });
  }

  IngresaAlumno(data:any) {

    if (this.dataInicial =="Ingreso" ){
      console.log(data);
      const now = new Date();
      const date = now.toISOString().split('T')[0]; // Obtiene solo la parte de la fecha
      this.userService.getControlPanelInfo(data.claveCliente,data.uid,date).subscribe((dataR: any) => {   
        console.log(dataR);                  
        if (dataR != undefined && dataR.length > 0){
          const dataAlumno: any = {
            active: true,
            claveCliente: data.claveCliente,
            claveGrado: data.claveGrado,
            userId: data.userId,
            initialTime: new Date().toISOString(),
            endTime: null,
            currentDate:new Date(),
            changeDate: null,
            date: date,
            alumnoId: data.uid,
            nombre:  data.nombre,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno : data.apellidoMaterno,
            photoURL: data.photoURL,
            studentName: data.nombre  + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno,
            uid:''
          }
          console.log(dataAlumno);
          this.userService.createControlPanel(dataAlumno).then((response: any) => {
            //console.log(response);
            this.notifyUser("Listo! Puede se ingreso al sistema.", "info");
          }).catch(err => {
            console.log(err);
          }); 
         
        }  else {          
          this.notifyUser("El alumno ya esta ingresado. Favor de Validar", "error");
          return;          
        }
      });
    }  
    else {
      this.notifyUser("No se puede ingresar ya que se esta dando salida al alumno.", "error");
    } 
  }

  SalidaAlumno(data:any) {
    if (this.dataInicial =="Salida" ){
    console.log(data);
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    this.userService.OutControlPanel(dateString,data.id,  this.user.claveCliente);
      //console.log(response);
      this.notifyUser("Se dio salida con éxito.", "info");    
    }
    else {
      this.notifyUser("Unicamente se puede dar salida al alumno.", "error");
    }
}


  private showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private notifyUser(message: string, type: 'info' | 'error' | 'warning') {
    this.showNotification(message, type);
  }

  onSubmit() {
 
    this.dialogRef.close("regreso");
    
  }
}
