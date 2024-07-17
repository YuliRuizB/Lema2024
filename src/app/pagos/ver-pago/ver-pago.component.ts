import { Component, Inject, inject } from '@angular/core';
import { UsersService } from '../../shared/services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ver-pago',
  templateUrl: './ver-pago.component.html',
  styleUrl: './ver-pago.component.scss'
})
export class VerPagoComponent {
  userService = inject(UsersService);
  grades: any [] = [];
  uidAlumno :any; 
  user: any;
  formG!: FormGroup;
  photoUrlS: string | ArrayBuffer | null = null;

  constructor( public authService: AuthenticationService,
    private fb: FormBuilder,   
    private snackBar: MatSnackBar,
    private usersService: UsersService,    
     public dialogRef: MatDialogRef<VerPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInicial: any){
      console.log(dataInicial);

      this.formG = this.fb.group({
        uid: [dataInicial.uid],
        charge_type:[dataInicial.charge_type],
        claveAlumno:[dataInicial.claveAlumno],  
        displayName:[dataInicial.displayName],  
        currency:[dataInicial.currency],  
        amount:[dataInicial.amount],  
        authorization: [dataInicial.authorization],
        date_created: dataInicial.date_created,
        active:[dataInicial.active],
        error_message: [dataInicial.error_message],
        productId:[dataInicial.productId],  
        productName: [dataInicial.productName],  
        status:[dataInicial.status],  
        claveCliente: [dataInicial.claveCliente],  
        claveGrado: [dataInicial.claveGrado],              
        gradoName:[],
        urlRef:  [dataInicial.urlRef]      
      });
      this.photoUrlS = dataInicial.urlRef;
      console.log(this.photoUrlS);
      this.usersService.getGradebyCustomerID(dataInicial.claveCliente, dataInicial.claveGrado).subscribe((data: any) => { 
        this.grades = data;  
        console.log(data);
        this.formG.patchValue({
          gradoName:data[0].name,      
        }); 

        console.log(this.formG.value);
      });        

  }
  onSubmit(){
    this.dialogRef.close("regreso"); 
  }
    
  ngOnInit(): void { 
           
      }    
 }

