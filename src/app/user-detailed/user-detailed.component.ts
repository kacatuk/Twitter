import { Component, OnInit } from '@angular/core';
import {Tweet} from '../shared/tweet.module';
import {TwitterService} from '../shared/twitter.service';

@Component({
  selector: 'app-user-detailed',
  templateUrl: './user-detailed.component.html',
  styleUrls: ['./user-detailed.component.css']
})
export class UserDetailedComponent implements OnInit {

  userTweets: Tweet[];

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.userTweets = this.twitterService.getUserTweets();
    this.twitterService.userTweetsUpdated.subscribe((tweets) => {
      this.userTweets = tweets;
    });
  }

  closeUserDetailed() {
    this.twitterService.clearUserTweets();
  }

}
