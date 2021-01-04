import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
//Pages
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsAreaComponent } from './components/products-area/products-area.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductsPageComponent,
    NavbarComponent,
    CarouselComponent,
    ProductsComponent,
    ProductsAreaComponent,
    ProductsCardComponent,
    AppComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
