/* eslint-disable node/no-unpublished-import */
import * as fs from 'fs';
import waitFor from 'wait-for-async';

const login = async (username: string, extension = '', password: string) => {
  const thePage = await browser.newPage();
  await thePage.goto('https://ringcentral.github.io/ringcentral-web-phone/');
  await thePage.click('input[name="server"]', {clickCount: 3}); // click 3 times to select all
  await thePage.type('input[name="server"]', process.env.RC_WP_SERVER!);
  await thePage.click('input[name="clientId"]', {clickCount: 3});
  await thePage.type('input[name="clientId"]', process.env.RC_WP_CLIENT_ID!);
  await thePage.click('input[name="clientSecret"]', {clickCount: 3});
  await thePage.type(
    'input[name="clientSecret"]',
    process.env.RC_WP_CLIENT_SECRET!
  );
  const [a] = await thePage.$x("//a[contains(., 'Simple Login')]");
  await a.click();
  await waitFor({interval: 1000});

  await thePage.click('input[name="username"]', {clickCount: 3});
  await thePage.type('input[name="username"]', username);
  await thePage.click('input[name="extension"]', {clickCount: 3});
  await thePage.type('input[name="extension"]', extension);
  await thePage.click('input[name="password"]', {clickCount: 3});
  await thePage.type('input[name="password"]', password);
  const [button] = await thePage.$x("//button[contains(., 'Login')]");
  await button.click();
  await waitFor({interval: 5000});
  return thePage;
};

describe('RingCentral Web Phone', () => {
  it('default', async () => {
    const callerPage = await login(
      process.env.RC_WP_CALLER_USERNAME!,
      process.env.RC_WP_CALLER_EXTENSION,
      process.env.RC_WP_CALLER_PASSWORD!
    );
    expect(await callerPage.$x("//button[contains(., 'Logout')]")).toHaveLength(
      1
    );
    const receiverPage = await login(
      process.env.RC_WP_RECEIVER_USERNAME!,
      process.env.RC_WP_RECEIVER_EXTENSION,
      process.env.RC_WP_RECEIVER_PASSWORD!
    );
    expect(
      await receiverPage.$x("//button[contains(., 'Logout')]")
    ).toHaveLength(1);

    fs.writeFileSync('./screenshots/caller.png', await callerPage.screenshot());
    fs.writeFileSync(
      './screenshots/receiver.png',
      await receiverPage.screenshot()
    );
  });
});
