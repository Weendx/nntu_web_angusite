export class FormMessage {
    private _text?: string;
    private _status?: string;
    public hidden = true;
  
    constructor(private timeout: number) {}
  
    set text(msg: string) {
      this._text = msg;
      this.hidden = false;
      setInterval(() => this.hidden = true, this.timeout);
      setInterval(() => this._text = '', this.timeout + 500);
    }
    get text(): string {
      return this._text ? this._text : '';
    }
    set status(msgType: string) {
      this._status = msgType;
    }
    get status(): string {
      return this._status ? this._status : '';
    }
  
    public show(msg: string, status?: string) {
      this.text = msg;
      this.status = String(status);
    }
  }