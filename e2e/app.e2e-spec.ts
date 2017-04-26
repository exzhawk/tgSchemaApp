import { AappPage } from './app.po';

describe('aapp App', () => {
  let page: AappPage;

  beforeEach(() => {
    page = new AappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
