import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routes';

import { HeroeService } from './services/heroe.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [AppComponent, HeroesComponent, HeroeComponent, KeysPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    HttpModule,
    FormsModule
  ],
  providers: [HeroeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
