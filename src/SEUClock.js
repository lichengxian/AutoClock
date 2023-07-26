const puppeteer = require("puppeteer"); // 模拟操作
const { log, delay } = require("./utils");

// 打开浏览器
const openBrowser = async () => {
  const browser = await puppeteer.launch({
    slowMo: 20, // 操作减慢
    headless: false, // 是否隐藏浏览器
    defaultViewport: { width: 960, height: 540 }, // 浏览器窗口大小
    ignoreHTTPSErrors: false, // 忽略 https 报错
    args: [`--window-size=${960},${540}`, "--no-sandbox"],
  });
  return browser;
};

// 开始健康打卡
const autoClock = async (user, delayTime) => {
  if (!user.active || !user.username || !user.password) return;
  let browser;
  try {
    // 打开页面
    browser = await openBrowser();
    const page = await browser.newPage();
    try {
      await page.goto(
        "http://ehall.seu.edu.cn/qljfwapp2/sys/lwReportEpidemicSeu/*default/index.do#/add"
      );
    } catch (e) {
      await page.reload();
      log(`登录页面重新加载`);
    }
    await delay(delayTime);
    // 账号
    const username = await page.waitForSelector("#username");
    await username.type(String(user.username), { delay: 1 });
    // 密码
    const password = await page.waitForSelector("#password");
    await password.type(String(user.password), { delay: 1 });
    // 点击登录
    const login = await page.waitForSelector("button[class*=login]");
    await login.click();
    await page.waitForNavigation();
    await delay(delayTime);
    // 填入体温
    const temperature = await page.waitForSelector(
      "input[placeholder*=请输入当天晨检体温]"
    );
    const text = await page.$eval(
      "input[placeholder*=请输入当天晨检体温]",
      (el) => el.value
    );
    if (text) throw new Error(`已经打卡`);
    temperature.type(String(36 + Number(Math.random().toFixed(1))));
    await delay(delayTime);
    // 点击提交
    const submit = await page.waitForSelector(
      "div[style*=padding].OPjctwlgzsl > button[class*=mint-button--large]"
    );
    submit.click();
    // 点击确认
    const sure = await page.waitForSelector(
      ".mint-msgbox > .mint-msgbox-btns > .mint-msgbox-confirm",
      { visible: true }
    );
    sure.click();
    // 流程结束
    await page.waitForNavigation();
    await delay(delayTime);
    log(`${user.username}打卡成功`);
  } catch (e) {
    log(`${user.username}打卡失败：${e.message}`);
  } finally {
    browser && (await browser.close());
  }
};

module.exports = autoClock;
