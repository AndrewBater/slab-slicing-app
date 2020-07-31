import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicerComponent } from './slicer.component';
import { SizeModel } from '../size/size.model';
import { SizeComponent } from '../size/size.component';
import { SlabComponent } from '../slab/slab.component';
import { PiecesComponent } from '../pieces/pieces.component';
import { FormsModule } from '@angular/forms';

describe('SlicerComponent', () => {
  let component: SlicerComponent;
  let fixture: ComponentFixture<SlicerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SlicerComponent, SizeComponent, SlabComponent, PiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
