import ErrorMatch from './Error/ErrorMatch';
import TimerEngine from './TimerEngine'

type timerFormat =
  | 'mm:ss'
  | 'hh:mm:mss'
  | 'dd:hh:mm:ss'
  | 'mm:ss:ms'
  | 'ss:ms'
  | 'ss'
  | 'mm';

export class Timer {
  private oneTime: RegExp = new RegExp(/^[0-9]./g);
  private twoTimes: RegExp = new RegExp(/^[0-9].[:][0-9]./g);
  private threeTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9]./g);
  private fourTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9].[:][0-9]./g);

  constructor(private format: timerFormat = 'mm:ss') {
    this.format = format;
  }

  /**
   * verifies that the time entered matches the timer format
   */
  private checkFormat(time:string):boolean {
    switch(this.format){
      case 'ss':
      case 'mm':
        if(!time.match(this.oneTime)) return false;
        break;
      
      case 'mm:ss':
      case 'ss:ms':
        if(!time.match(this.twoTimes)) return false;
        break;

      case 'hh:mm:mss':
      case 'mm:ss:ms':
        if(!time.match(this.threeTimes)) return false;
        break;

      case 'dd:hh:mm:ss':
        if (!time.match(this.fourTimes)) return false;
        break;

      default:
        return false;
    }

    return true;
  }

  /**
   * Separate the time in string, to an array of integers according to the format
   * @param time a time
   * @param format a format record
   */
  private separateTimes(time:string, format:Record<string, number>): number[] {
    const separatedTime: string[] = format['ss'] == 0 ? [time] : time.split(':');
    return separatedTime.map(u => parseInt(u))
  }

  public timeCount(initialTime: string = '00:00'): string | never {
    const formatRecorder: Record<string, number> = {}; //will check what times are activaded
    this.format.split(':').forEach((e, i) => {
      formatRecorder[e] = i;
    });

    const formatIsCorrect = this.checkFormat(initialTime);
    if(!formatIsCorrect) throw new ErrorMatch();
    
    const separatedTimes = this.separateTimes(initialTime, formatRecorder)

    let timerengine = new TimerEngine(separatedTimes, formatRecorder)

    if (formatRecorder['ss'] >= 0) {
        timerengine.secondsEngine()
    }
    
    if (formatRecorder['mm'] >= 0) {
      if (formatRecorder['ss'] >= 0) {
        timerengine.minutesEngine(true)
      } else {
        timerengine.minutesEngine(false)
      }
    }

    return 'string';
  }
}
