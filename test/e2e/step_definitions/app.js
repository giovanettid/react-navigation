import { When, Then } from '@cucumber/cucumber';

When(/^Go js starter$/, async () => {
  await browser.url('/');
});

Then(/^Says "(.*)"$/, async (starter) => {
  expect(await $('.starter').getText()).toBe(starter);
});
