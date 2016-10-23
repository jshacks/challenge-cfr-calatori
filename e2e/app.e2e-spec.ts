import { CfrCalatoriPage } from './app.po';

describe('cfr-calatori App', function() {
  let page: CfrCalatoriPage;

  beforeEach(() => {
    page = new CfrCalatoriPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
