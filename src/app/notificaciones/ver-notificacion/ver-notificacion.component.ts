import { ChangeDetectionStrategy , Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../shared/services/usuarios.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-notificacion',
  templateUrl: './ver-notificacion.component.html',
  styleUrl: './ver-notificacion.component.scss'
})
export class VerNotificacionComponent {
  formG!: FormGroup;
  userService = inject(UsersService);
  user: any;
  
  constructor(
    public authService: AuthenticationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VerNotificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInicial: any
  ){
    this.formG = this.fb.group({
      uid: [dataInicial.uid],
      active:[dataInicial.active],
      claveCliente: [dataInicial.claveCliente],
      date_creation: [dataInicial.date_creation],
      expiredDate: [dataInicial.expiredDate],
      claveAlumno: [dataInicial.claveAlumno],
      claveGrado: [dataInicial.claveGrado],        
      description: [dataInicial.description],
      subTitle: [dataInicial.subTitle],
      notify_Type:[dataInicial.notify_Type],
      title:  [dataInicial.title],
      imageURL: [dataInicial.imageURL],
      startDate: [dataInicial.startDate],
      repeatAtDay: [dataInicial.repeatAtDay]     
    });
  
  }
  ngOnInit() {
    console.log(this.dataInicial);  
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user; 
        this.formG.patchValue({
          claveCliente: this.user.claveCliente
        });
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

  onSubmit(){
    this.dialogRef.close("regreso");      
  }

}
