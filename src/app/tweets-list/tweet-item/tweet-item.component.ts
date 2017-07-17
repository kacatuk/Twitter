import {Component, Input, OnInit} from '@angular/core';
import {Tweet} from '../../shared/tweet.module';
import {TwitterService} from '../../shared/twitter.service';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.css']
})
export class TweetItemComponent implements OnInit {

  @Input() tweet: Tweet;

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
  }
  showTweetInfo() {
    console.log(this.tweet);
  }

  getTweetsForUser() {
    this.twitterService.loadUserTweets(this.tweet.getScreenName());
  }

}
