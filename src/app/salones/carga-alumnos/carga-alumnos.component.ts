import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UsersService } from '../../shared/services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-carga-alumnos',
  templateUrl: './carga-alumnos.component.html',
  styleUrl: './carga-alumnos.component.scss'
})
export class CargaAlumnosComponent {
  user: any;
  public dataInicial: any[];
  displayedColumns: string[] = [ 'photoURL','claveAlumno', 'nombre', 'apellidoPaterno', 'apellidoMaterno'];


constructor( private snackBar: MatSnackBar,
  public authService: AuthenticationService,  
  private usersService: UsersService,
  public dialogRef: MatDialogRef<CargaAlumnosComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any){
    this.dataInicial = data;
   }

   ngOnInit() {
    console.log(this.dataInicial);  
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;      
      }
    }); 
    
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
