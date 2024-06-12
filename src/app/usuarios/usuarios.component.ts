import { MatTabsModule } from '@angular/material/tabs';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UsersService } from '../shared/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoModalComponent } from './alumno-modal.component';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = ['clave', 'displayName', 'email', 'claveCliente'];
  displayedColumnsAlumnos: string[] = ['claveAlumno','nombre', 'apellidoPaterno', 'apellidoMaterno', 'claveGrado'];
  ELEMENT_DATA: usuariosTable[] = [];
  Element_Data_Alumnos: alumnosTable[] = [];
  dataSource = new MatTableDataSource<usuariosTable>(this.ELEMENT_DATA);
  dataSourceAlumnos = new MatTableDataSource<alumnosTable>(this.Element_Data_Alumnos);
  filterValue: string = '';
  userForm: FormGroup; 
  userFormEdit: FormGroup;
  user: any;
  userSelected:any;
  client: any = [];
  activeTabIndex = 0; 
  editUser: string = "";
  verUsuarioClicked: boolean = false;
  verAlumnosClicked: boolean = false;
  fileValue:any;
  imageUrl:any = "https://firebasestorage.googleapis.com/v0/b/lema-fc20e.appspot.com/o/users%2F1707773026777_etiqueta22.jpeg?alt=media&token=c6581850-9f00-4517-87bc-9a4a1d40644c"; 
  clientName:any = "";
  displayName:any = "";
  uidUsuario: any= "";
  fallbackImageUrl: string = 'assets/LLogo.png'; // Set a valid fallback image path
  
    
  @ViewChild('download') download!: ElementRef;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private router: Router, 
    private cdr: ChangeDetectorRef,
    public authService: AuthenticationService,
    private dialog: MatDialog,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,

    private usersService: UsersService, private fb: FormBuilder) {    //TODO  

    this.authService.user.subscribe( (user) => {
      this.user = user; 
  //    console.log(this.user);
      if(this.user != null){
        
        this.usersService.getClientInfo(this.user.claveCliente).subscribe((data1: any[]) => {   
        //  console.log(data1);
          this.client = data1;          
          this.clientName=this.client[0].name ?? "";
      //    console.log(this.clientName)
          this.usersService.getUserInfo(this.user.claveCliente,10).subscribe((data: any) => {        
          this.ELEMENT_DATA = data;
          this.uidUsuario = this.user.uid;
          this.dataSource = new MatTableDataSource<usuariosTable>(this.ELEMENT_DATA);
 
       });
      });   
      }

          
  });
  
  this.userFormEdit = this.fb.group({
    claveCliente: ['', Validators.required],
    name: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],  
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    phone2: [''],
    phone3: [''],
    calle:[''],
    numero:[''],
    colonia:[''],
    estado:[''],
    codigoPostal:[''],
    city: [''],
    municipio: [''],
    password: [''],
    emailverified:[''],      
    displayName: [''],
    id:[],
    parentesco: ['', Validators.required],
    parentesco2: [],
    parentesco3: [],
    photoURL:[null],
    photoURLInfo:[null],
  });
    this.userForm = this.fb.group({
      claveCliente: ['', Validators.required],
      name: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      phone2: [''],
      phone3: [''],
      calle:[''],
      numero:[''],
      colonia:[''],
      estado:[''],
      codigoPostal:[''],
      city: [''],
      municipio: [''],
      password: [''],
      emailverified:[''],      
      displayName: [''],
      id:[],
      parentesco: ['', Validators.required],
      parentesco2: [],
      parentesco3: [],
      photoURL:[null],
      photoURLInfo:[null],
    });

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: any) {
    const filterValue = event.target.value;
    if (filterValue.length > 0){
        this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      //console.log(filterValue);
      //console.log("filterValue");
    }
  
  }
  
  onImageError(event: Event) {
    console.error('Image failed to load:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = this.fallbackImageUrl;
  }

  clearFilter(): void {
    this.dataSource.filter = '';
  }

  verUsuario(uid:any){
    this.editUser = uid;
    this.verUsuarioClicked = true; 
    this.verAlumnosClicked = false;
    this.loadUserInfo(uid);
  }
  loadUserInfo(uid:any) {
    this.usersService.getUserInfoByID(uid,10).subscribe((data: any) => {        
      this.userSelected = data;
      console.log(this.userSelected);
      this.displayName= data[0]["displayName"];
      this.userFormEdit.patchValue({
        claveCliente: data[0]["claveCliente"],
        name:data[0]["name"],
        apellidoPaterno: data[0]["apellidoPaterno"],
        apellidoMaterno: data[0]["apellidoMaterno"],
        fechaNacimiento: data[0]["fechaNacimiento"],
        email:data[0]["email"],
        phone: data[0]["phone"],
        phone2: data[0]["phone2"],
        phone3: data[0]["phone3"],
        calle: data[0]["calle"],
        numero: data[0]["numero"],
        colonia: data[0]["colonia"],
        estado: data[0]["estado"],
        codigoPostal:data[0]["codigoPostal"],
        city:data[0]["city"],
        municipio:data[0]["municipio"],
        password: data[0]["password"],
        emailverified:data[0]["emailverified"],
        displayName:data[0]["displayName"],
        uid: data[0]["uid"],
        parentesco: data[0]["parentesco"],
        parentesco2: data[0]["parentesco2"],
        parentesco3: data[0]["parentesco3"],
        photoURL:data[0]["photoURL"],
      });
      this.imageUrl =data[0]["photoURL"];

      console.log(this.imageUrl);
   //   console.log(this.userFormEdit.value);
      this.cdr.detectChanges(); 
   });
  }

  
  verAlumnos(uid:any){  
    console.log("ver alumnos id" + uid);
    this.verAlumnosClicked = true;
    this.verUsuarioClicked = false; 
    
    this.usersService.getAlumnoInfo(uid).subscribe((data: any) => {       
      console.log(data); 
      this.Element_Data_Alumnos = data;
   });    
  }
  onTabChange(index: number) {
    if (index === 1) {
      this.verUsuarioClicked = false; // Set the default tab index
      this.verAlumnosClicked = false;
    }
  }

  borrarUsuario(id:any){    
    console.log("borrar usuario id" +id);
  }

  pagosUsuario(id:any){    
    console.log("pagos usuario id" +id);
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

  addAlumno() {
    const dialogRef = this.dialog.open(AlumnoModalComponent, {
      width: '400px', // Set the width as per your requirement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle the result if needed
    }); 
   
  }
  submitForm() {
    // Puedes manejar la lógica de envío del formulario aquí
    this.userForm.controls['claveCliente'].setValue(this.user.claveCliente);
    console.log(this.userForm.value);
  
    if (this.userForm.valid){
       console.log(this.userForm.value);
       const userData = this.userForm.value;
      
      this.usersService.createUser(userData).then((response: any) => {
        //console.log(response);
        this.notifyUser("Listo! usuario generado.", "info");

        this.uploadImage(response);
      }).catch((err:any) => {
        console.log(err);
      });
    } else {
      this.notifyUser("Faltan datos por agregar.", "error");
    }
  }
  closeVerUsuario(): void {
    this.verUsuarioClicked = false;
    this.verAlumnosClicked = false;
    this.userFormEdit.reset();
  }

  submitFormEdit() {
    console.log("Save Edit");

  }
  private showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private notifyUser(message: string, type: 'info' | 'error' | 'warning') {
    this.showNotification(message, type);
  }

  uploadImage(response: string) {
    const file = this.fileValue;//this.userForm.get('photoUrlInfo')?.value;    
    if (file) {      
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = this.storage.ref(`users/${fileName}`);
      const uploadTask = storageRef.put(file);
  
      uploadTask.percentageChanges().subscribe((progress:any) => {
        console.log(`Upload progress: ${progress}%`);
      });
  
      uploadTask.then((snapshot:any) => snapshot.ref.getDownloadURL())
        .then((downloadURL:any) => {
          console.log('File available at', downloadURL);
  
          // Update the correct field in the form
          this.userForm.controls['photoURL'].setValue(downloadURL);
          this.usersService.updateUserInfoByID(response,downloadURL);
        })
        .catch((error:any) => {
          console.error('Error uploading file:', error);
        });  
    }
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    console.log(file);
    // Set the value of the image control with the selected file
    this.fileValue =file;
   /*  this.userForm.patchValue({
      photoUrlInfo: file
    });
 */
    // Optionally, you can update the form's validity based on the file selection
   // this.userForm.get('photoUrlInfo')?.updateValueAndValidity();
   
  }


  downloadImg(): void {
    const element = document.getElementById('download');
    if (element) {
      // Wait for all images to load
      const images = element.getElementsByTagName('img');
      const loadPromises = Array.from(images).map(img => {
        if (!img.complete) {
          return new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
          });
        }
        return Promise.resolve();
      });

      Promise.all(loadPromises).then(() => {
        // All images are loaded, now capture the screenshot
        html2canvas(element).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'download.png';
          link.click();
        }).catch((error) => {
          console.error('Error capturing the div as an image:', error);
        });
      }).catch((error) => {
        console.error('Error loading images:', error);
      });
    } else {
      console.error('Element with id "download" not found.');
    }
  }
}
export interface usuariosTable {
  clave: string;
  displayName: string;
  email: string;
  claveCliente:string;
}

export interface alumnosTable {
  claveAlumno: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno:string;
  claveGrado:string;
}



