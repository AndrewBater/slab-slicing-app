import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlabComponent } from './slab/slab.component';
import { SlicerComponent } from './slicer/slicer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PiecesComponent } from './pieces/pieces.component';
import { SizeComponent } from './size/size.component';

@NgModule({
  declarations: [
    AppComponent,
    SlabComponent,
    SlicerComponent,
    PiecesComponent,
    SizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
