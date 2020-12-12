export default class TimerEngine {
  private minute: boolean = false;

  constructor(
    private separatedTimes: number[],
    private formatRecorder: Record<string, number>
  ) {
    this.separatedTimes = separatedTimes;
    this.formatRecorder = formatRecorder;
  }

  public secondsEngine() {
    setInterval(() => {
      console.log(this.separatedTimes); //show seconds
      if (this.separatedTimes[this.formatRecorder['ss']] === 59) {
        this.separatedTimes[this.formatRecorder['ss']] = -1;
        this.minute = true;
      }
      ++this.separatedTimes[this.formatRecorder['ss']];
    }, 1000);
  }
  
  public minutesEngine(areSeconds: boolean) {
    if (areSeconds) {
      setInterval(() => {
        if (this.minute) {
          ++this.separatedTimes[this.formatRecorder['mm']];
          this.minute = false;
        }
      });
    } else {
      setInterval(() => {
        console.log(this.separatedTimes);
        if (this.separatedTimes[this.formatRecorder['mm']] === 59) {
          this.separatedTimes[this.formatRecorder['mm']] = 0;
        }
        ++this.separatedTimes[this.formatRecorder['mm']];
        console.log(this.separatedTimes);
      }, 60000);
    }
  }
}
