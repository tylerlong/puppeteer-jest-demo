import * as fs from 'fs';

describe('Google', () => {
  it('default', async () => {
    await page.goto('https://ringcentral.github.io/ringcentral-web-phone/');
    const buffer = await page.screenshot();
    fs.writeFileSync('./test.png', buffer);
  });
});
