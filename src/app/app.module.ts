import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, // Your root component
  ],
  imports: [
    BrowserModule, // This is necessary for running in a browser environment
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstraps your root component
})
export class AppModule {}
