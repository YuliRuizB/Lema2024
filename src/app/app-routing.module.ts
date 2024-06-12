import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MenuComponent } from './menu/default/menu.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesAlumnosComponent } from './reportes-alumnos/reportes-alumnos.component';
import { PagosComponent } from './pagos/pagos.component';
import { ProductosComponent } from './productos/productos.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { ReportesAdministracionComponent } from './reportes-administracion/reportes-administracion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { SalonesComponent } from './salones/salones.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { ReportesSalonesComponent } from './reportes-salones/reportes-salones.component';
import { ConsolaComponent } from './consola/consola.component';
const routes: Routes = [
	{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent },
  { path: 'home', component: MenuComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'reportes-alumnos', component: ReportesAlumnosComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'consola', component: ConsolaComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'promociones', component: PromocionesComponent },
  { path: 'reportes-administracion', component: ReportesAdministracionComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'salones', component: SalonesComponent },
  { path: 'maestros', component: MaestrosComponent },
  { path: 'reportes-salones', component: ReportesSalonesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
