import {Component, OnInit} from '@angular/core';
import {TwitterService} from './shared/twitter.service';
import {Tweet} from './shared/tweet.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchTweets: Tweet[];
  userTweets: Tweet[];

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.authorize();
    this.searchTweets = this.twitterService.getSearchTweets();
    this.userTweets = this.twitterService.getUserTweets();
    this.twitterService.twittersListRefreshed.subscribe((tweets) => {
      this.searchTweets = tweets;
    });
    this.twitterService.userTweetsUpdated.subscribe((tweets) => {
      this.userTweets = tweets;
    });
  }

  private authorize() {
   this.twitterService.authorize();
  }

  onSearchPressed(inputRef: HTMLInputElement) {
    this.twitterService.getSearchResults(inputRef.value);
  }
}
