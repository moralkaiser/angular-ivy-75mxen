import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  /*
  VARIABLES
--------------------------------------------------------------------------------
*/

  refreshTimerId: any;

  time: number;

  startTime: number;

  timerText: string;

  /*
  EVENT EMITTER
--------------------------------------------------------------------------------
*/

  @Output() toggledNewLoopEvent = new EventEmitter<number>();
  @Output() viewUpdateEvent = new EventEmitter<number>();

  /*
  EVENT EMITTER
--------------------------------------------------------------------------------
*/

  constructor() {
    this.timerText = '00:00';
  }

  /*
  CLICK METHODS
--------------------------------------------------------------------------------
*/

  workClicked() {
    this.setTimer(25);
  }

  shortBreakClicked() {
    this.setTimer(5);
  }

  longBreakClicked() {
    this.setTimer(15);
  }

  /*
  TIME PROCEDURE
--------------------------------------------------------------------------------
*/

  setTimer(timeToSetMin: number) {
    // clearVisualContext();
    clearInterval(this.refreshTimerId);

    this.time = timeToSetMin * 60;
    this.startTime = this.time;

    this.toggledNewLoopEvent.emit(this.startTime);

    this.formatTimerText(this.time);
    // drawFullCircle();

    this.refreshTimerId = setInterval(() => {
      this.timerRunning();
    }, 1000);
  }

  timerRunning() {
    this.time--;

    if (this.time <= 0) {
      // STOP
      clearInterval(this.refreshTimerId);
    } else {
      // SHOW TIME
      this.viewUpdateEvent.emit(this.time);
      this.formatTimerText(this.time);
      // formatLayerBg(time);
      // formatTimeIndicatorCircle(time);
    }
  }

  formatTimerText(time) {
    var minute = Math.floor(time / 60);
    var second = time % 60;

    var outputString =
      '' +
      (minute < 10 ? '0' + minute : minute) +
      ':' +
      (second < 10 ? '0' + second : second);

    this.timerText = outputString;
  }
}
