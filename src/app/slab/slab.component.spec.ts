import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabComponent } from './slab.component';
import { SizeComponent } from '../size/size.component';
import { SizeModel } from '../size/size.model';
import { FormsModule } from '@angular/forms';

describe('SlabComponent', () => {
  let component: SlabComponent;
  let fixture: ComponentFixture<SlabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SlabComponent, SizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabComponent);
    component = fixture.componentInstance;
    component.slab = new SizeModel(5,5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
