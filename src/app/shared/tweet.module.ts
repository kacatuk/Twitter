export class Tweet {

  constructor(private content: string, private user: string, private imageURL: string) {}

  getUser() {
    return this.user
  }

  getContent() {
    return this.content;
  }
}
