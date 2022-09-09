const axios = require("axios");
const cheerio = require("cheerio");

const autoLearn = async (laravel_session) => {
  // 抓包获取cookie
  // const laravel_session = "Czp0vnwKLWgyI8LYCFYmmLJUsbXrFMkr8iPwLbyR";
  if (!laravel_session) return;
  // 青年大学习课程接口
  let url = "https://service.jiangsugqt.org/youth/lesson";
  // 参数
  let params = {
    s: "/youth/lesson",
    form: "inglemessage",
    isappinstalled: "0",
  };
  // Header
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 9; ELE-AL00 Build/HUAWEIELE-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220604 Mobile Safari/537.36 MMWEBID/4170 MicroMessenger/8.0.24.2180(0x28001851) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
    Cookie: "laravel_session=" + laravel_session,
  };
  // 发送请求
  let response = await axios.get(url, { params, headers });
  const html = response.data;
  // 解析HTML
  const $ = cheerio.load(html);
  // 获取用户信息
  console.log(`--- 用户信息 ---`);
  const userInfo = $(".confirm-user-info p");
  for (const item of userInfo) {
    console.log(item.lastChild.data);
  }
  // 青年大学习打卡接口
  url = "https://service.jiangsugqt.org/youth/lesson/confirm";
  // 获取_token和lesson_id
  const data = {
    _token: html.match(/var token = "(\w+)"/i)[1],
    lesson_id: Number(html.match(/'lesson_id':(.*)/i)[1]),
  };
  // 发送请求
  response = await axios({ method: "post", url, data, headers });
  if (response.data.status === 1 && response.data.message === "操作成功") {
    console.log(`--- 学习成功 ---`);
    return;
  }
  console.log(`--- 学习失败 ---`);
};

module.exports = autoLearn;
