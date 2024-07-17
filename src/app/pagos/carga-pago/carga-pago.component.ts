import { Component, Inject, inject } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../shared/services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Observable, finalize, map } from 'rxjs';

@Component({
  selector: 'app-carga-pago',
  templateUrl: './carga-pago.component.html',
  styleUrl: './carga-pago.component.scss'
})
export class CargaPagoComponent {
  userService = inject(UsersService);
  user: any;
  photoUrlS: string | ArrayBuffer | null = null;
  formG!: FormGroup;
  fileValue: any;
  imageUrl: any;  
  bucketPath: string = 'payments/';
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
  grades: any [] = [];
  students: any [] = [];
  products: any [] = [];
  uidAlumno :any; 

  constructor(
    public authService: AuthenticationService,
    private fb: FormBuilder,
    private bucketStorage: AngularFireStorage,  
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private storage: AngularFireStorage,   
     public dialogRef: MatDialogRef<CargaPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInicial: any){

        this.formG = this.fb.group({
        uid: [],
        charge_type:['', Validators.required],
        claveAlumno:['', Validators.required],  
        displayName:['', Validators.required],  
        currency:['', Validators.required],  
        amount:['', Validators.required],  
        authorization: ["portalAuth"],
        date_created: new Date,
        active:[true],
        error_message: [""],
        productId:['', Validators.required],  
        productName: ['', Validators.required],  
        status:['', Validators.required],  
        claveCliente: ['', Validators.required],  
        claveGrado: ['', Validators.required],              
        urlRef:  ['']      
      });
      
    }

      
  ngOnInit(): void {    
    this.authService.user.subscribe((user) => {
      if (user) {        
        this.user = user; 
        this.usersService.getGradebyCustomer(this.user.claveCliente).subscribe((data: any) => { 
          this.grades = data;            
        });     
        this.usersService.getProductsbyCustomer(this.user.claveCliente).subscribe((data: any) => { 
          this.products = data;            
        });  
      }
    }); 
  }

  onStudentSelected(event:any ){
    console.log(event);
    this.uidAlumno =event.uid;
    this.formG.patchValue({
      claveAlumno: event.claveAlumno,
      claveGrado: event.claveGrado,
      claveCliente: event.claveCliente,
      displayName: event.nombre +" " + event.apellidoPaterno + " " +  event.apellidoMaterno,
      currency: "MXN"
    });
  }

  onSubmit(){
   console.log(this.formG.value);
   console.log( this.uidAlumno);
   if (this.formG.valid) {
      this.userService.createPayment(this.formG.value,  this.uidAlumno);

      this.notifyUser("El pago ha sido generado.", "info");

      this.dialogRef.close("regreso"); 
   } else {
    this.notifyUser("Faltan datos de ingresar, Validar la información. ", "error");
      
   }
  }

  onGradeSelected(event:any) {  
    this.usersService.getStudentsByGrade(event.value,this.user.claveCliente).subscribe((data: any) => {       
     this.students = data;
    });
  }

  onProductSelected(event:any  ){
    console.log(event);
    
    this.formG.patchValue({
      amount: event.amount,
      productId: event.uid,
      productName: event.name
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

  handleFileInput(event: any) {
    const file = event.target.files[0];
    console.log(file);

    this.fileValue = file;
    this.formG.patchValue({
      urlPhoto: file.name  // or file URL if storing a URL
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
   
        const fileRef = this.bucketStorage.ref(this.bucketPath);
   
        if (typeof reader.result === 'string') {
          this.photoUrlS = reader.result;
       
          const fileName = file.name;
          const filePath = `${this.bucketPath}/${fileName}`;
          const fileRef = this.bucketStorage.ref(filePath);
          this.task = this.bucketStorage.ref(filePath).putString(this.photoUrlS, 'data_url');        
          this.uploadPercent = this.task.percentageChanges() as Observable<number>;
    
          this.uploadPercent.pipe(
              map((a:any) => {
                  return Number((a / 100).toFixed(2));
              })
          ).subscribe((value) => {
              this.uploading = value != 0;
              this.uploadvalue = value;
          }) 
          this.task.snapshotChanges().pipe(
            finalize(() => {
                this.uploading = false;
                this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe(async (url) => {
                    this.updatePhotoURL(url);
                });
            })
          ).subscribe(); 

        } else {
          console.error('Reader result is not a string:', reader.result);
          // Handle the case where reader.result is not a string (possibly null or ArrayBuffer)
        }
      };
    }
  }

  async updatePhotoURL(url: any) {
    console.log("started updatePhotoURL with url: ", url); 
  this.formG.controls['urlRef'].patchValue(url);  
  }
   



}
