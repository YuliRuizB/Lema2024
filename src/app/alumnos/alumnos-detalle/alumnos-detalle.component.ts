import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../../shared/services/usuarios.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';

@Component({
  selector: 'app-alumnos-detalle',
  templateUrl: './alumnos-detalle.component.html',
  styleUrl: './alumnos-detalle.component.scss'
})
export class AlumnosDetalleComponent {

  alumnoForm!: FormGroup ;
  photoUrl: string | ArrayBuffer | null = null;
  grados: any[] = [];
  uidAlumno:any;
  bucketPath: string = 'students/';
  task: AngularFireUploadTask | undefined;
  // Progress in percentage
  uploadPercent: Observable<number> | undefined;
  uploadvalue: number = 0;
  downloadURL: Observable<string> | undefined;
  // Snapshot of uploading file
  snapshot: Observable<any> | undefined;
  // Uploaded File URL
  UploadedFileURL: Observable<string> | undefined;
  //Uploaded Image List
  images: Observable<any[]> | undefined;
  //photoUrlupdate: string | ArrayBuffer | null = null;
  uploading: boolean = false;
  constructor(private fb: FormBuilder,
    private bucketStorage: AngularFireStorage,    
    public dialogRef: MatDialogRef<AlumnosDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService
  ) {}

  ngOnInit() {

    console.log(this.data);
    const fechaNacimientoDate = this.data.fechaNacimiento.toDate();


    this.photoUrl = this.data.photoURL || '';
    this.uidAlumno = this.data.uid || '' ;
    this.alumnoForm = this.fb.group({
      nombre: [this.data.nombre || '', Validators.required],  // Pre-fill form controls with data
      apellidoPaterno: [this.data.apellidoPaterno || '', Validators.required],
      apellidoMaterno: [this.data.apellidoMaterno || '', Validators.required],
      claveAlumno: [this.data.claveAlumno || '', Validators.required],
      fechaNacimiento: [fechaNacimientoDate, Validators.required],
      claveCliente: [this.data.claveCliente || ''],
      claveGrado: [this.data.claveGrado || ''],
      photoURL: [this.data.photoURL || ''],
      userId: [this.data.userId || ''],
      active: [this.data.active || ''],
      informacionMedica: [this.data.informacionMedica || '']
    });
    if (this.data.claveGrado) {
      this.usersService.getGradesInfo(this.data.claveCliente, 10).subscribe(
        (data: any) => {
          this.grados = data;
        },
        (error) => {
          console.error('Error fetching grados:', error);
        }
      );
    }
    
  }
  // Convenience getter for easy access to form controls
  get f() { return this.alumnoForm.controls; }


  onSubmit() {
    console.log("entro");
    if (this.alumnoForm.valid) {    
      // Handle form submission logic here
      console.log(this.alumnoForm.value);
      this.usersService.updateStudent(this.uidAlumno,  this.alumnoForm.value);

      this.dialogRef.close(this.alumnoForm.value);
    } else {
      // Handle form invalid case
      console.log('Form is not valid');
    }
  }

 


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
   
        const fileRef = this.bucketStorage.ref(this.bucketPath);
   
        if (typeof reader.result === 'string') {
          this.photoUrl = reader.result;
       
          const fileName = file.name;
          const filePath = `${this.bucketPath}/${fileName}`;
          const fileRef = this.bucketStorage.ref(filePath);
          this.task = this.bucketStorage.ref(filePath).putString(this.photoUrl, 'data_url');        
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
  this.alumnoForm.controls['photoURL'].patchValue(url);  
  this.usersService.updateStudentAvatar(this.uidAlumno, url);   
   
}

}