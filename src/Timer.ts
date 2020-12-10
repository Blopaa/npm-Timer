import { ErrorTimer } from './Error';

type timerFormat = 'mm:ss' | 'hh:mm:mss' | 'dd:hh:mm:ss' | 'mm:ss:ms' | 'ss:ms';

export class Timer {
  private twoTimes: RegExp = new RegExp(/^[0-9].[:][0-9]./g);
  private threeTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9]./g);
  private fourTimes: RegExp = new RegExp(/^[0-9].[:][0-9].[:][0-9].[:][0-9]./g);

  constructor(private format: timerFormat = 'mm:ss') {
    this.format = format;
  }

  public timeCount(initialTime: string = '00:00'): string | never {
    switch (this.format) {
      case 'dd:hh:mm:ss':
        if (!initialTime.match(this.fourTimes)) throw new ErrorTimer().formatUnMatch()
        break;
      case 'hh:mm:mss':
          if(!initialTime.match(this.threeTimes)) throw new ErrorTimer().formatUnMatch()
        break;
      case 'mm:ss:ms':
        if(!initialTime.match(this.threeTimes)) throw new ErrorTimer().formatUnMatch()
        break;
      case 'mm:ss':
        if(!initialTime.match(this.twoTimes)) throw new ErrorTimer().formatUnMatch()
        break;
      case 'ss:ms':
        if(!initialTime.match(this.twoTimes)) throw new ErrorTimer().formatUnMatch()
        break;
      default:
        throw new ErrorTimer().formatUnMatch();
    }

    return 'string';
  }
}
