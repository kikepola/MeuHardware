import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'graphiccard', component: ProductsPageComponent },
  { path: 'motherboard', component: ProductsPageComponent },
  { path: 'processor', component: ProductsPageComponent },
  { path: 'memory', component: ProductsPageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
