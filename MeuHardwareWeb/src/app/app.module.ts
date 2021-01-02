import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsAreaComponent } from './components/products-area/products-area.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    ProductsComponent,
    ProductsAreaComponent,
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
