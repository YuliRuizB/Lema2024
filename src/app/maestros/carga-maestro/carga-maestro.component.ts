import { Component, Inject, inject } from '@angular/core';
import { UsersService } from '../../shared/services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';

@Component({
  selector: 'app-carga-maestro',
  templateUrl: './carga-maestro.component.html',
  styleUrl: './carga-maestro.component.scss'
})
export class CargaMaestroComponent {
  userService = inject(UsersService);
  user: any;
  photoUrlS: string | ArrayBuffer | null = null;
  formG!: FormGroup;
  fileValue: any;
  imageUrl: any;  
  bucketPath: string = 'teachers/';
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

constructor(
    public authService: AuthenticationService,
    private fb: FormBuilder,
    private bucketStorage: AngularFireStorage,  
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private storage: AngularFireStorage,   
     public dialogRef: MatDialogRef<CargaMaestroComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInicial: any){
      
      this.formG = this.fb.group({
        uid: [],
        active:[true],
        claveCliente: [''],
        claveGrado: ['', Validators.required],        
        name: ['', Validators.required],
        urlPhoto:  ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        apellidoPaterno: ['', Validators.required]
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
  this.formG.controls['urlPhoto'].patchValue(url);  
  }
   

  onSubmit(){
    if (this.formG.valid) {
      console.log(this.formG.value);
      this.usersService.createTeacher(this.formG.value).then((response: any) => {       
        this.notifyUser("Listo! El Maestro a sido  generado.", "info");
       
        this.dialogRef.close("regreso");       

      }).catch((err: any) => {
        console.log(err);
      });
     
    }
  }
}
