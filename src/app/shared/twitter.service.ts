

import {Http, Headers} from '@angular/http';
import {Tweet} from './tweets-list/tweet.module';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class TwitterService {

  twittersListRefreshed = new EventEmitter<Tweet[]>();

  private tweets: Tweet[] = [];

  constructor(private http: Http) {}

  getTweets() {
    return this.tweets.slice();
  }

  getSearchResults(searchRequest: string) {
    console.log('Search action started');
    const headers = new Headers()
    const searchTerm = 'query=' + searchRequest;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3000/search', searchTerm, {headers: headers}).subscribe((res) => {
      this.tweets = this.castResToTweets(res.json().data.statuses);
      this.twittersListRefreshed.emit(this.getTweets());
    });
  }

  // onUserCall() {
  //   const headers = new Headers();
  //   const username = 'screenname=' + 'PeterLandau';
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.post('http://localhost:3000/user', username, {headers: headers}).subscribe((res) => {
  //     this.tweetsData = res.json().data;
  //   })
  // }

  private castResToTweets(res: Response[]) {
    const tweets: Tweet[] = [];
    for (const tweetData of res){
      tweets.push(new Tweet(tweetData.text.toString(), tweetData['user']['name'], tweetData['user']['profile_image_url']));
    }
    console.log(tweets);
    return tweets;
  }

}
