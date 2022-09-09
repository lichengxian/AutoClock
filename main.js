const puppeteer = require("puppeteer"); // 模拟操作
const YAML = require("yamljs"); // 解析YAML文件
const fs = require("fs"); // 解析文件
const path = require("path"); // 路径相关
const crypto = require('crypto'); // 加密相关
// 解密
const decode = (str, secret) => {
  const decipher = crypto.createDecipheriv('aes-128-cbc', secret, "0123456789abcdef");
  const strings = decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
  return strings.split(" ");
}
// 读取配置文件
const yaml_file = path.join(__dirname, "./config.yaml");
const cfg = YAML.parse(fs.readFileSync(yaml_file).toString());
const delayTime = cfg.setting.delayTime;
// 打开浏览器
async function openBrowser() {
  const browser = await puppeteer.launch({
    slowMo: 20, // 操作减慢
    headless: false, // 是否隐藏浏览器
    defaultViewport: { width: 960, height: 540 }, // 浏览器窗口大小
    ignoreHTTPSErrors: false, // 忽略 https 报错
    args: [`--window-size=${960},${540}`, "--no-sandbox"],
  });
  return browser;
}
// 延迟一定时间
async function delay(time) {
  return new Promise((r) => setTimeout(r, time));
}
// 开始打卡
async function clock(user) {
  let browser;
  const userInfo = decode(user.info, user.key);
  try {
    // 打开页面
    browser = await openBrowser();
    const page = await browser.newPage();
    await page.goto("https://seicwxbz.seu.edu.cn/self-service/");
    await delay(delayTime);
    // 账号
    const username = await page.waitForSelector("#username");
    await username.type(String(userInfo[0]), { delay: 1 });
    // 密码
    const password = await page.waitForSelector("#password");
    await password.type(String(userInfo[1]), { delay: 1 });
    // 点击登录
    const login = await page.waitForSelector("button[class*=login]");
    await login.click();
    await page.waitForNavigation();
    await delay(delayTime);
    // 点击健康申报
    const report = await page.waitForSelector("#right-inner > div:first-child");
    await report.click();
    await page.waitForNavigation();
    await delay(delayTime);
    // 等待列表加载后
    await page.waitForSelector(".mint-loadmore > .mint-loadmore-content");
    // 点击新增
    const add = await page
      .waitForSelector(".pjcse52gj > button[class*=bottom155]", {
        timeout: 5000,
      })
      .catch(() => {
        throw new Error(`---${userInfo[0]} 已经打卡---`);
      });
    await add.click();
    await page.waitForNavigation();
    await delay(delayTime);
    // 填入体温
    const temperature = await page.waitForSelector(
      "input[placeholder*=请输入当天晨检体温]"
    );
    temperature.type(String(36 + Number(Math.random().toFixed(1))));
    // 点击提交
    const submit = await page.waitForSelector(
      ".OPjctwlgzsl > button[class*=mint-button--large]"
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
    console.log(`---${userInfo[0]} 打卡成功---`);
  } catch (e) {
    console.log(e.message);
    console.log(`---${userInfo[0]} 打卡失败---`);
  } finally {
    browser && await browser.close();
  }
}

const main = async () => {
  for (const user of cfg.users) {
    await clock(user);
  }
};
main();
