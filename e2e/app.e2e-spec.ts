import { WebstoreFinalPage } from './app.po';

describe('webstore-final App', function() {
  let page: WebstoreFinalPage;

  beforeEach(() => {
    page = new WebstoreFinalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
