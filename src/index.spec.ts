/* eslint-disable node/no-unpublished-import */
import * as fs from 'fs';
import waitFor from 'wait-for-async';

describe('Google', () => {
  it('default', async () => {
    await page.goto('https://ringcentral.github.io/ringcentral-web-phone/');
    await page.click('input[name="server"]', {clickCount: 3});
    await page.type('input[name="server"]', process.env.RC_WP_SERVER!);
    await page.type('input[name="clientId"]', process.env.RC_WP_CLIENT_ID!);
    await page.type(
      'input[name="clientSecret"]',
      process.env.RC_WP_CLIENT_SECRET!
    );
    const [a] = await page.$x("//a[contains(., 'Simple Login')]");
    await a.click();
    await waitFor({interval: 1000});

    await page.type(
      'input[name="username"]',
      process.env.RC_WP_CALLER_USERNAME!
    );
    await page.type(
      'input[name="extension"]',
      process.env.RC_WP_CALLER_EXTENSION!
    );
    await page.type(
      'input[name="password"]',
      process.env.RC_WP_CALLER_PASSWORD!
    );
    const [button] = await page.$x("//button[contains(., 'Login')]");
    await button.click();
    await waitFor({interval: 5000});
    const buffer = await page.screenshot();
    fs.writeFileSync('./test.png', buffer);
  });
});
