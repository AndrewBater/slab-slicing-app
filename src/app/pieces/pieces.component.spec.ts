import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesComponent } from './pieces.component';
import { SizeComponent } from '../size/size.component';
import { FormsModule } from '@angular/forms';

describe('PiecesComponent', () => {
  let component: PiecesComponent;
  let fixture: ComponentFixture<PiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ PiecesComponent, SizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesComponent);
    component = fixture.componentInstance;
    component.pieces = new Array();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
