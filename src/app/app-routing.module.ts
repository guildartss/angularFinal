import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { FacturasListComponent } from './pages/facturas/facturas-list/facturas-list.component';
import { FacturaFormComponent } from './pages/facturas/factura-form/factura-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'facturas', component: FacturasListComponent, canActivate: [AuthGuard] },
  { path: 'facturas/nueva', component: FacturaFormComponent, canActivate: [AuthGuard] },
  { path: 'facturas/editar/:id', component: FacturaFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };