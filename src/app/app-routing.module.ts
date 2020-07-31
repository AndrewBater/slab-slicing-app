import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlicerComponent } from './slicer/slicer.component';

const routes: Routes = [
  { path: '', redirectTo: '/slice', pathMatch: 'full' },
  { path: 'slice', component: SlicerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
