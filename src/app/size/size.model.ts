export class SizeModel {
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.sorted = false;
  }
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  public sorted: boolean;
  public log: boolean;

  get area() {
    return this.width * this.height;
  }
}