import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-circlevis',
  templateUrl: './circlevis.component.html',
  styleUrls: ['./circlevis.component.css']
})
export class CircleVisComponent {
  @Input() time = 0;
  @Input() totalTime = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (this.rendererReady) {
      if (changes['totalTime']) {
        // Do your logic here
        this.drawFullCircle();
      }
      if (changes['time']) {
        // Do your logic here
        this.formatTimeIndicatorCircle(this.time);
      }
    }
  }

  rendererReady = false;
  value = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  resetValue() {
    this.value = '____TempValue____';
    this.changeDetectorRef.detectChanges();
    this.value = '';
  }

  ngAfterViewInit() {
    this.rendererReady = true;
    this.prepareEnv();
  }

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef<
    HTMLCanvasElement
  >;
  @ViewChild('background', { static: false }) background: ElementRef<
    HTMLCanvasElement
  >;
  // layerBackground;

  windowWidth: number;
  windowHeight: number;

  centerX: number;
  centerY;

  ctx: any;
  ctx_bg: any;

  radius: number;
  circleColor: string;

  prepareEnv() {
    // layerBackground = document.getElementsByClassName("container")[0];

    // myCanvas = document.getElementById("myCanvas");
    // background = document.getElementById("background");

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.myCanvas.nativeElement.width = this.windowWidth;
    this.myCanvas.nativeElement.height = this.windowHeight;

    this.background.nativeElement.width = this.windowWidth;
    this.background.nativeElement.height = this.windowHeight;

    this.centerX = this.windowWidth / 2;
    this.centerY = this.windowHeight / 2;

    this.ctx = this.myCanvas.nativeElement.getContext('2d');
    this.ctx_bg = this.background.nativeElement.getContext('2d');

    this.circleColor = '#ff0000';

    this.radius =
      (this.windowWidth > this.windowHeight
        ? this.windowHeight
        : this.windowWidth) * 0.48;
  }

  drawFullCircle() {
    // this.clearVisualContext();
    this.ctx_bg.fillStyle = '#ffffff';

    this.ctx_bg.beginPath();
    this.ctx_bg.moveTo(this.centerX, this.centerY);

    this.ctx_bg.arc(
      this.centerX,
      this.centerY,
      this.radius,
      -Math.PI / 2,
      Math.PI * 2 * 1 - Math.PI / 2,
      false
    );
    this.ctx_bg.fill();

    this.ctx_bg.fillStyle = '#000000';

    // ctx_bg.beginPath();
    // ctx_bg.moveTo(centerX,centerY);
    // console.log(radius);
    // ctx_bg.arc(centerX, (centerY-235)*1.2, 3, -Math.PI/2, (Math.PI * 2) * 1 -Math.PI/2,false);
    // ctx_bg.fill();

    var counterDotsMaxLimit = 60;

    for (
      let counterDots = 1;
      counterDots <= counterDotsMaxLimit;
      counterDots++
    ) {
      var degrees = (360 / counterDotsMaxLimit) * counterDots;

      this.ctx_bg.beginPath();
      this.ctx_bg.moveTo(this.centerX, this.centerY);
      var x =
        this.centerX +
        this.radius * 0.95 * Math.cos(this.degrees_to_radians(degrees));
      var y =
        this.centerY +
        this.radius * 0.95 * Math.sin(this.degrees_to_radians(degrees));
      this.ctx_bg.arc(
        x,
        y,
        counterDots % 5 == 0 ? 3 : 1,
        -Math.PI / 2,
        Math.PI * 2 * 1 - Math.PI / 2,
        false
      );
      this.ctx_bg.fill();
    }
  }

  degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }
  formatTimeIndicatorCircle(timeToSet) {
    this.drawPieSlice(
      this.ctx,
      this.centerX,
      this.centerY,
      this.radius,
      timeToSet / this.totalTime
    );
  }

  drawPieSlice(ctx, centerX, centerY, radius, fillPercentage) {
    this.clearVisualContext();
    ctx.fillStyle = this.circleColor;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    ctx.arc(
      centerX,
      centerY,
      radius * 0.9,
      -Math.PI / 2,
      -Math.PI * 2 * fillPercentage - Math.PI / 2,
      true
    );
    ctx.fill();
    this.resetValue();
  }

  clearVisualContext() {
    this.ctx.clearRect(
      0,
      0,
      this.myCanvas.nativeElement.width,
      this.myCanvas.nativeElement.height
    );
  }
}
