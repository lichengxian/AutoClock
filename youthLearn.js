const axios = require("axios");
const cheerio = require("cheerio");
const { log } = require("./utils");

const autoLearn = async (laravel_session) => {
  if (!laravel_session) return;
  // 青年大学习课程接口
  let url = "https://service.jiangsugqt.org/api/lessons";
  // 参数
  let params = { page: "1", limit: 5 };
  // Header
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 9; ELE-AL00 Build/HUAWEIELE-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220604 Mobile Safari/537.36 MMWEBID/4170 MicroMessenger/8.0.24.2180(0x28001851) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
    Cookie: "laravel_session=" + laravel_session,
  };
  // 发送请求
  let response = await axios({ method: "post", url, params, headers });
  const latest_lesson = response.data.data[0];
  // 青年大学习打卡接口
  url = "https://service.jiangsugqt.org/api/doLesson";
  // 获取_token和lesson_id
  const data = { lesson_id: Number(latest_lesson.id) };
  // 发送请求
  response = await axios({ method: "post", url, data, headers });
  if (response.data.status === 1 && response.data.message === "操作成功") {
    log(`--- 青年大学习${latest_lesson.title}打卡成功 ---`);
    return;
  }
};

module.exports = autoLearn;
