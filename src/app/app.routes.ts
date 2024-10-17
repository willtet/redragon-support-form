import { Routes } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';
import { ParentComponent } from './parent/parent.component';
import { GarantiaComponent } from './garantia/garantia.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { SoftwareComponent } from './software/software.component';
import { EnviadoComponent } from './enviado/enviado.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { component: HomeComponent, path: "home" },
  {
    component: ParentComponent,
    path: "formulario",
    children: [
      { path: "", redirectTo: "inicio", pathMatch: "full" },
      { component: InicioComponent, path: "inicio" },
      { component: FiltrosComponent, path: "filtros" },
      { component: GarantiaComponent, path: "garantia" },
      { component: SoftwareComponent, path: "software" },
      { path: "**", redirectTo: "inicio" },
    ]
  },
  { path: "**", redirectTo: "home" },
];
