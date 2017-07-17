import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {TwitterService} from './shared/twitter.service';
import {TweetItemComponent} from './tweets-list/tweet-item/tweet-item.component';
import { UserDetailedComponent } from './user-detailed/user-detailed.component';

@NgModule({
  declarations: [
    AppComponent,
    TweetItemComponent,
    UserDetailedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
