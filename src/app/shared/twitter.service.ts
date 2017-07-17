

import {Http, Headers} from '@angular/http';
import {Tweet} from './tweet.module';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class TwitterService {

  twittersListRefreshed = new EventEmitter<Tweet[]>();
  userTweetsUpdated = new EventEmitter<Tweet[]>();

  private searchResults: Tweet[] = [];
  private userTweets: Tweet[] = [];

  constructor(private http: Http) {}

  getSearchTweets() {
    return this.searchResults.slice();
  }

  getUserTweets() {
    return this.userTweets.slice();
  }

  clearUserTweets() {
    this.userTweets = [];
    this.userTweetsUpdated.emit([]);
  }

  getSearchResults(searchRequest: string) {
    console.log('Search action started');
    const headers = new Headers()
    const searchTerm = 'query=' + searchRequest;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3000/search', searchTerm, {headers: headers}).subscribe((res) => {
      console.log(res.json().data.statuses);
      this.searchResults = this.castResToTweets(res.json().data.statuses);
      this.twittersListRefreshed.emit(this.getSearchTweets());
    });
  }

  loadUserTweets(user: string) {
    console.log(user);
    const headers = new Headers();
    const username = 'screenname=' + user;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3000/user', username, {headers: headers}).subscribe((res) => {
      this.userTweets = this.castResToTweets(res.json().data);
      console.log(this.userTweets);
      this.userTweetsUpdated.emit(this.getUserTweets());
    })
  }

  authorize() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
      console.log(res);
    });
  }

  private castResToTweets(res: Response[]) {
    const tweets: Tweet[] = [];
    for (const tweetData of res){
      tweets.push(new Tweet(tweetData.text.toString(),
        tweetData['user']['name'],
        tweetData['user']['profile_image_url'],
        tweetData['user']['screen_name'],
        new Date(tweetData['created_at'])));
    }
    console.log(tweets);
    return tweets;
  }

}
