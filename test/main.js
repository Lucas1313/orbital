import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import webdriver from 'selenium-webdriver';
import handlebars from 'handlebars';

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set(
  'chromeOptions', {
    args: [
      '--headless',
      '--no-sandbox',
    ],
  },
);

const getDriver = async () => new webdriver.Builder()
  .forBrowser('chrome')
  .usingServer('https://chrome.browserless.io/webdriver')
  .withCapabilities(chromeCapabilities)
  .build();

const loadBasePage = async (driver) => {
  const resolve = async file => fs.readFile(path.resolve(__dirname, file), 'utf8');
  const source = await resolve('./base/index.hbs');
  const orbitalSource = await resolve('../dist/orbital.min.js');

  const template = handlebars.compile(source);

  const renderedHTML = template({
    orbitalSource,
  });

  // Load page
  await driver.get(`data:text/html;charset=utf-8,${renderedHTML}`);
};

test('loading expected base file', async (t) => {
  const driver = await getDriver();
  await loadBasePage(driver);

  t.is(await driver.getTitle(), 'The Test Site, Launch facility and otherwise');
  t.deepEqual(
    await driver.executeScript('return Object.keys(window.orbital)'),
    ['loaders', 'registerLoader', 'import'],
  );
  await driver.quit();
});
