import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const screenshotDir = './temporary screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function takeScreenshot(url, label = '') {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Find next screenshot number
    const files = fs.readdirSync(screenshotDir);
    let maxNum = 0;
    files.forEach(f => {
      const match = f.match(/screenshot-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });

    const nextNum = maxNum + 1;
    const filename = label
      ? `screenshot-${nextNum}-${label}.png`
      : `screenshot-${nextNum}.png`;

    const filePath = path.join(screenshotDir, filename);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Screenshot saved: ${filePath}`);

    await browser.close();
  } catch (err) {
    console.error('Screenshot error:', err);
    if (browser) await browser.close();
    process.exit(1);
  }
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
takeScreenshot(url, label);
