import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { GraficasComponent} from './graficas/graficas.component';
import { TablaComponent} from './tabla/tabla.component';
import { UnicoComponent} from './unico/unico.component';
import { MenuComponent} from './menu/menu.component';
const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'grafica', component: GraficasComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'tabla', component: TablaComponent},
  { path: 'unico', component: UnicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
