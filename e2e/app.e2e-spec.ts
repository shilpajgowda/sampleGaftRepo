import { NewGaftPage } from './app.po';

describe('new-gaft App', () => {
  let page: NewGaftPage;

  beforeEach(() => {
    page = new NewGaftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
