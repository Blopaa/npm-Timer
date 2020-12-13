import {EventEmitter} from 'events'
export default class TimerEngine {
  private _actualtime: number[] = [];
  protected emitter = new EventEmitter()

  constructor(
    private separatedTimes: number[],
    private formatRecorder: Record<string, number>
  ) {
    this.separatedTimes = separatedTimes;
    this.formatRecorder = formatRecorder;
    this.on("tick", data => this._actualtime = data)
  }

  public secondsEngine() {
    setInterval(() => {
      this.emitter.emit("tick", this.separatedTimes)
      if (this.separatedTimes[this.formatRecorder['ss']] === 59) {
        this.separatedTimes[this.formatRecorder['ss']] = -1;
      }
      ++this.separatedTimes[this.formatRecorder['ss']];
    }, 1000);
  }
  
  public minutesEngine() {
    let startTime = (61 - (this.separatedTimes[this.formatRecorder['ss']])  || 0) * 1000;
      setTimeout(() => {
        ++this.separatedTimes[this.formatRecorder['mm']];
        setInterval(() => {
          this.emitter.emit("tick", this.separatedTimes)
          if (this.separatedTimes[this.formatRecorder['mm']] === 59) {
            this.separatedTimes[this.formatRecorder['mm']] = 0;
          }
          ++this.separatedTimes[this.formatRecorder['mm']];
          console.log(this.separatedTimes);
        }, 60000);
      }, startTime)
  }

  public on(event:string, cb:(...args:any) => void):void {
    this.emitter.on(event, cb)
  }

  public get currentTime():number[] {
    return this._actualtime
  }
}
