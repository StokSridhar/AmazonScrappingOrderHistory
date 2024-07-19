import puppeteer from 'puppeteer';
const LOGIN_URL = 'https://www.amazon.com/ap/signin';
const ORDER_HISTORY_URL = 'https://www.amazon.com/gp/your-account/order-history';
const USERNAME = "PLEASEYOURLOGIN";
const PASSWORD = "PLEASEYOURLOGIN";
export async function getPurchaseHistory() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    console.log("Log in to Amazon.............")
    await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });
    await page.type('input#ap_email', USERNAME);
    await page.click('input#continue');
    await page.waitForSelector('input#ap_password');
    await page.type('input[name="password"]', PASSWORD);
    await page.click('input#signInSubmit');
    console.log("Login Success...")
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log("Navigating to Order History page....")
    await page.goto(ORDER_HISTORY_URL, { waitUntil: 'networkidle2' });
    console.log("order history page is loading from API....")
    await page.waitForSelector('.order');
    console.log("Fetching from purchase history......")
    const purchaseItems = await page.$$eval('.order', orders => {
      return orders.slice(0, 5).map(order => {
        const itemName = order.querySelector('.a-link-normal')?.textContent || '';
        const itemDate = order.querySelector('.order-info .a-color-secondary.value')?.textContent || '';
        const itemPrice = order.querySelector('.a-color-secondary .value')?.textContent || '';
        return { itemName, itemDate, itemPrice };
      });
    });
    console.log('Here you go Last 5 Purchased Items:', purchaseItems);
  } catch (error) {
    console.error('Error Amazon purchase history:', error);
  } finally {
    await browser.close();
  }
}
getPurchaseHistory();