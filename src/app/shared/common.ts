export class FormMessage {
  private _text?: string;
  private _status?: string;
  private _timeoutIds = {text: 0, class: 0};
  public hidden = true;

  constructor(private timeout: number) {}

  set text(msg: string) {
    this._text = msg;
    this.hidden = false;
    clearTimeout(this._timeoutIds.text);
    clearTimeout(this._timeoutIds.class);
    this._timeoutIds.text = window.setTimeout(() => this.hidden = true, this.timeout);
    this._timeoutIds.class = window.setInterval(() => this._text = '', this.timeout + 500);
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