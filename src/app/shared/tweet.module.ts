export class Tweet {

  constructor(private content: string, private user: string, private imageURL: string, private screenName: string, private date: Date) {}

  getUser() {
    return this.user
  }

  getContent() {
    return this.content;
  }

  getImageURL() {
    return this.imageURL;
  }

  getScreenName() {
    return this.screenName;
  }

  getDate() {
    const day = ('0' + this.date.getUTCDate()).slice(-2);
    const month = ('0' + this.date.getUTCMonth()).slice(-2);
    const year = this.date.getUTCFullYear();
    const hour = ('0' + this.date.getUTCHours()).slice(-2);
    const minute = ('0' + this.date.getUTCMinutes()).slice(-2);
    const stringDate = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
    return stringDate;
  }
}
