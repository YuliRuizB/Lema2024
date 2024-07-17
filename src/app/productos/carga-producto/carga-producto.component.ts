import { Component, Inject, inject } from '@angular/core';
import { UsersService } from '../../shared/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-carga-producto',
  templateUrl: './carga-producto.component.html',
  styleUrl: './carga-producto.component.scss'
})
export class CargaProductoComponent {
  userService = inject(UsersService);
  user: any;
  product: any;
  title:any = "";
  photoUrlS: string | ArrayBuffer | null = null;
  formG!: FormGroup;
  fileValue: any;
  imageUrl: any;  
  bucketPath: string = 'product/';
  task: AngularFireUploadTask | undefined;
  // Progress in percentage
  uploadPercent: Observable<number> | undefined;
  uploadvalue: number = 0;
  downloadURL: Observable<string> | undefined;
  // Snapshot of uploading file
  snapshot: Observable<any> | undefined;
  // Uploaded File URL
  UploadedFileURL: Observable<string> | undefined;
  uploading: boolean = false;
  images: Observable<any[]> | undefined;
  types: string[] = ['Producto', 'Servicio']; // Opciones para el select

  constructor(
    public authService: AuthenticationService,
    private fb: FormBuilder,
    private bucketStorage: AngularFireStorage,  
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private storage: AngularFireStorage,   
     public dialogRef: MatDialogRef<CargaProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInicial: any){
 
    }

    ngOnInit() {
      this.formG = this.fb.group({
        active: ['', Validators.required],
        amount: [null, [Validators.required, Validators.min(0)]],
        claveCliente: ['', Validators.required],
        name: ['', Validators.required],
        date_from: [null, Validators.required],
        date_to: [null, Validators.required],
        type: ['', Validators.required],
        date_created: [null, Validators.required],
        uid: [''],
      });


      console.log(this.dataInicial);  
      if (this.dataInicial == "0") {
          this.title = "Crear Producto";
          this.authService.user.subscribe((user) => {
            if (user) {
              this.user = user; 
              this.formG.patchValue({
                claveCliente: this.user.claveCliente,
                date_created: new Date ,
                active: true               
              });
            }
          }); 
      } else {
        this.title = "Editar Producto";
        this.authService.user.subscribe((user) => {
          if (user) {
            this.user = user; 
            this.userService.getProductsbyIdbyCustomer(this.user.claveCliente,this.dataInicial).subscribe((data: any) => {        
              console.log(data);
              if (data) {
                this.product= data;
                let dateTo;
               let datefrom;
                if (this.product[0].date_to && this.product[0].date_from) {
                dateTo = this.product[0].date_to.toDate();
                datefrom = this.product[0].date_from.toDate();
                } else {
                dateTo = null;
                datefrom  = null;
                }
            

              this.formG.patchValue({ 
              active: this.product[0].active,
              amount:  this.product[0].amount,
              claveCliente:  this.product[0].claveCliente,
              name:  this.product[0].name,
              date_from:  datefrom,
              date_to: dateTo,
              type:  this.product[0].type,
              date_created: this.product[0].date_created,
              uid: this.product[0].uid });
              }
              console.log(this.formG.value);
            });        
          }
        }); 
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
  

  onSubmit(){
    if (this.formG.valid) {
      console.log(this.formG.value);
      if (this.dataInicial == "0") {
      this.usersService.createProduct(this.formG.value).then((response: any) => {       
        this.notifyUser("El Producto a sido creado.", "info");
       
        this.dialogRef.close("regreso");       

      }).catch((err: any) => {
        console.log(err);
      }); 
    } else {
      this.usersService.updateProduct(this.dataInicial,this.formG.value).then((response: any) => {       
        this.notifyUser("El Producto a sido actualizado.", "info");
       
        this.dialogRef.close("regreso");       

      }).catch((err: any) => {
        console.log(err);
      }); 
    }     
    } else {
      this.notifyUser("Hay campos requeridos, favor de validar", "error");
    }

  }
    
}
