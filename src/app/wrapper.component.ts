import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { CircleVisComponent } from './circlevis.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent {
  timerValue: number;
  totalTimeValue: number;

  constructor() {
    this.timerValue = 0;
  }

  newCounterStarted(eventValue: number) {
    this.totalTimeValue = eventValue;
  }

  refreshTimerValue(eventTimerValue: number) {
    this.timerValue = eventTimerValue;
  }
}
