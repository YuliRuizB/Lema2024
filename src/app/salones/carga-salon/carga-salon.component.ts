import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-carga-salon',
  templateUrl: './carga-salon.component.html',
  styleUrl: './carga-salon.component.scss'
})
export class CargaSalonComponent {  
  user: any;
  formG!: FormGroup;

constructor( private snackBar: MatSnackBar,
  public authService: AuthenticationService,
  private fb: FormBuilder,
  private usersService: UsersService,
  public dialogRef: MatDialogRef<CargaSalonComponent>,
 @Inject(MAT_DIALOG_DATA) public dataInicial: any){
  
  this.formG = this.fb.group({
    uid: [],
    claveCliente: [''],
    claveGrado: ['', Validators.required],
    description: ['', Validators.required],
    name: ['', Validators.required]
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

onSubmit() {
  console.log(this.formG.value);
  if (this.formG.valid) {
   
    this.usersService.createGrade(this.formG.value);    
    this.dialogRef.close("regreso");
    this.notifyUser("Se a creado el Salón  con éxito.","info");
    // aquí puedes manejar el envío del formulario
  }  else {
    this.notifyUser("Es necesario llenar los campos requeridos","error");
  }
 
  
}

}
