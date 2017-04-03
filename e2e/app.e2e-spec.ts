import { Kickassclassifieds.WebPage } from './app.po';

describe('kickassclassifieds.web App', () => {
  let page: Kickassclassifieds.WebPage;

  beforeEach(() => {
    page = new Kickassclassifieds.WebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
