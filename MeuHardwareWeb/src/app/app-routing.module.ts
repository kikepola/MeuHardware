import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GraphiccardComponent } from './pages/graphiccard/graphiccard.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'graphiccard', component: GraphiccardComponent },
  { path: 'motherboard', component: GraphiccardComponent },
  { path: 'cpu', component: GraphiccardComponent },
  { path: 'memory', component: GraphiccardComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
