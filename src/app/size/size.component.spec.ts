import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeComponent } from './size.component';
import { SizeModel } from './size.model';
import { FormsModule } from '@angular/forms';

describe('SizeComponent', () => {
  let component: SizeComponent;
  let fixture: ComponentFixture<SizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeComponent);
    component = fixture.componentInstance;
    component.size = new SizeModel(5, 5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
