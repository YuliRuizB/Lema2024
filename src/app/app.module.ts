import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeTestComponent } from './core/pages/home-test/home-test.component';
import { environment } from '../app/environments/enviroment.prod';
//import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
//import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from './menu/default/menu.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesAlumnosComponent } from './reportes-alumnos/reportes-alumnos.component';
import { PagosComponent } from './pagos/pagos.component';
import { AlumnoModalComponent } from './usuarios/alumno-modal.component';
import { ProductosComponent } from './productos/productos.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { ReportesAdministracionComponent } from './reportes-administracion/reportes-administracion.component';
import { SalonesComponent } from './salones/salones.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { ReportesSalonesComponent } from './reportes-salones/reportes-salones.component';
import { LoginComponent } from './auth/login/login.component';
import { PleaseVerifyEmailComponent } from './auth/please-verify-email/please-verify-email.component';
import { CommonLayoutComponent } from './menu/common-layout/common-layout.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import {MatCardModule} from '@angular/material/card';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { ConsolaComponent } from './consola/consola.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AlumnosDetalleComponent } from './alumnos/alumnos-detalle/alumnos-detalle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeTestComponent,
    MenuComponent,
    AlumnosComponent,
    UsuariosComponent,
    ReportesAlumnosComponent,
    PagosComponent,
    AlumnoModalComponent,
    ProductosComponent,
    PromocionesComponent,
    ReportesAdministracionComponent,
    NotificacionesComponent,
    SalonesComponent,
    MaestrosComponent,
    ReportesSalonesComponent,   
    LoginComponent,  
    AlumnoModalComponent,
    PleaseVerifyEmailComponent,
    CommonLayoutComponent,
    VerifyEmailComponent,
    ConsolaComponent,
    AlumnosDetalleComponent 
  ],
  imports: [
    MatSlideToggleModule,
    NzModalModule,
    MatExpansionModule,
    NzQRCodeModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,    
    MatSelectModule,
    CommonModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    NzBreadCrumbModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    NzFormModule, 
    FormsModule,
    MatTabsModule,    
    MatNativeDateModule,    
    MatTableModule,
    MatToolbarModule,    
    MatInputModule,
    MatInputModule,
    MatPaginatorModule,
    NzDropDownModule,
    MatSnackBarModule, 
    MatDatepickerModule,
    NzMenuModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    NzResultModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
