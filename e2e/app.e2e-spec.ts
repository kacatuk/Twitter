import { MyFinalTwitterAppPage } from './app.po';

describe('my-final-twitter-app App', () => {
  let page: MyFinalTwitterAppPage;

  beforeEach(() => {
    page = new MyFinalTwitterAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
