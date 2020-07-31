import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SizeModel } from './size.model';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.sass']
})
export class SizeComponent implements OnInit {
  @Input() size: SizeModel;

  @Output() dataChange = new EventEmitter<SizeModel>();

  constructor() { }

  ngOnInit() {
  }

  onDataChange() {
    this.dataChange.emit(this.size);
  }
}
