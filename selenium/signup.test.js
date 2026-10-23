const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const path = require('path');
const { pathToFileURL } = require('url');

const signupUrl = pathToFileURL(path.join(__dirname, '..', 'app', 'signup.html')).href;

describe('Signup form (Selenium)', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--window-size=1280,900');
    if (process.env.CI || process.env.HEADLESS) {
      options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
    }
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  beforeEach(async function () {
    await driver.get(signupUrl);
  });

  async function fillAndSubmit({ name, email, password, confirm, terms }) {
    await driver.findElement(By.id('name')).sendKeys(name);
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('confirm')).sendKeys(confirm);
    if (terms) await driver.findElement(By.id('terms')).click();
    await driver.findElement(By.css('button[type="submit"]')).click();
  }

  async function waitForText(id) {
    const el = await driver.findElement(By.id(id));
    await driver.wait(async () => (await el.getText()).length > 0, 5000);
    return el.getText();
  }

  // SU-01: valid signup
  it('SU-01 valid signup creates an account', async function () {
    await fillAndSubmit({
      name: 'Test User',
      email: 'test.user@example.com',
      password: 'Password123',
      confirm: 'Password123',
      terms: true,
    });
    assert.strictEqual(await waitForText('success'), 'Account created successfully');
    assert.strictEqual(await driver.findElement(By.id('error')).getText(), '');
  });

  // SU-03: invalid email format
  it('SU-03 invalid email shows an error', async function () {
    await fillAndSubmit({
      name: 'Test User',
      email: 'user@',
      password: 'Password123',
      confirm: 'Password123',
      terms: true,
    });
    assert.strictEqual(await waitForText('error'), 'Enter a valid email address');
    assert.strictEqual(await driver.findElement(By.id('success')).getText(), '');
  });

  // SU-04: empty required fields
  it('SU-04 empty form shows a required-field error', async function () {
    await driver.findElement(By.css('button[type="submit"]')).click();
    assert.strictEqual(await waitForText('error'), 'All fields are required');
    assert.strictEqual(await driver.findElement(By.id('success')).getText(), '');
  });

  // SU-05: password below minimum length
  it('SU-05 short password shows an error', async function () {
    await fillAndSubmit({
      name: 'Test User',
      email: 'test.user@example.com',
      password: 'Short12',
      confirm: 'Short12',
      terms: true,
    });
    assert.strictEqual(await waitForText('error'), 'Password must be at least 8 characters');
    assert.strictEqual(await driver.findElement(By.id('success')).getText(), '');
  });

  // SU-07: passwords do not match
  it('SU-07 mismatched passwords show an error', async function () {
    await fillAndSubmit({
      name: 'Test User',
      email: 'test.user@example.com',
      password: 'Password123',
      confirm: 'Different456',
      terms: true,
    });
    assert.strictEqual(await waitForText('error'), 'Passwords do not match');
    assert.strictEqual(await driver.findElement(By.id('success')).getText(), '');
  });
});