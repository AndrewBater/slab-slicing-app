import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SizeModel } from '../size/size.model';

@Component({
  selector: 'app-slab',
  templateUrl: './slab.component.html',
  styleUrls: ['./slab.component.sass']
})
export class SlabComponent implements OnInit {
  @Input() slab: SizeModel;
  @Output() slabDataChange = new EventEmitter<SizeModel>();

  constructor() { }

  ngOnInit() {
  }

  recieveChange() {
    this.slabDataChange.emit(this.slab);
  }
}