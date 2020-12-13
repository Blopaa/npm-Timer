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

  public countFowardseconds() {
    setInterval(() => {
      this.emitter.emit("tick", this.separatedTimes)
      if (this.separatedTimes[this.formatRecorder['ss']] === 59) {
        this.separatedTimes[this.formatRecorder['ss']] = -1;
      }
        ++this.separatedTimes[this.formatRecorder['ss']];
    }, 1000);
  }

  public countDownSeconds(){
    let secondsInterval = setInterval(() => {
      this.emitter.emit("tick", this.separatedTimes)
      if(this.separatedTimes[this.formatRecorder['mm']] >= 1 && this.separatedTimes[this.formatRecorder['ss']] == 0){
        this.separatedTimes[this.formatRecorder['ss']] = 60
      }
      if(this.separatedTimes[this.formatRecorder['mm']] == 0 && this.separatedTimes[this.formatRecorder['ss']] == 0){
        this.stop(secondsInterval)
      }
      --this.separatedTimes[this.formatRecorder['ss']];
    }, 1000)
  }
  
  public countFowardMinutes() {
    let startTime = (61 - (this.separatedTimes[this.formatRecorder['ss']])  || 0) * 1000;

      setTimeout(() => {
          ++this.separatedTimes[this.formatRecorder['mm']];
         setInterval(() => {
          this.emitter.emit("tick", this.separatedTimes)
          if (this.separatedTimes[this.formatRecorder['mm']] === 59) {
            this.separatedTimes[this.formatRecorder['mm']] = 0;
          }
            ++this.separatedTimes[this.formatRecorder['mm']];
        }, 60000);
      }, startTime)
  }

  public countDownMinutes() {
    let startTime = (this.separatedTimes[this.formatRecorder['ss']] + 2) * 1000;
    let minutesInterval = setTimeout(() => {
      --this.separatedTimes[this.formatRecorder['mm']];
      setInterval(() => {
        this.emitter.emit("tick", this.separatedTimes)
        if(this.separatedTimes[this.formatRecorder['mm']] == 0 && this.separatedTimes[this.formatRecorder['ss']] == 0){
          this.stop(minutesInterval)
        }
        --this.separatedTimes[this.formatRecorder['mm']];
      }, 60000)
    }, startTime)
  }

  public on(event:string, cb:(...args:any) => void):void {
    this.emitter.on(event, cb)
  }

  public get currentTime():number[] {
    return this._actualtime
  }

  public stop(toStop: any){
    clearInterval(toStop)
  }
}
