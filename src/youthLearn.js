const axios = require("axios");
const { log } = require("./utils");

const autoLearn = async (user) => {
  if (!user.active || !user.openid) return;
  try {
    // 获取授权access_token
    let url = `https://qczj.h5yunban.com/qczj-youth-learning/cgi-bin/login/we-chat/callback`;
    let params = {
      callback: encodeURIComponent(
        `https://qczj.h5yunban.com/qczj-youth-learning/index.php`
      ),
      appid: "wx56b888a1409a2920",
      openid: user.openid,
      time: Date.now(),
    };
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 9; ELE-AL00 Build/HUAWEIELE-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220604 Mobile Safari/537.36 MMWEBID/4170 MicroMessenger/8.0.24.2180(0x28001851) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
    };
    let response = await axios({ method: "get", url, params, headers });
    const access_token = response.data.match(
      /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/gi
    )[0];
    if (!access_token) throw new Error(`页面授权获取失败`);

    // 获取最新课程代码
    url = `https://qczj.h5yunban.com/qczj-youth-learning/cgi-bin/common-api/course/current`;
    params = { accessToken: access_token };
    response = await axios({ method: "get", url, params, headers });
    const course_id = response.data.result.id;
    const course_title = response.data.result.title;
    if (!course_id) throw new Error(`最新课程获取失败`);

    // 打卡学习
    url = `https://qczj.h5yunban.com/qczj-youth-learning/cgi-bin/user-api/course/join?accessToken=${access_token}`;
    data = {
      course: course_id,
      nid: "",
      subOrg: "",
      cardNo: "",
    };
    response = await axios({ method: "post", url, data, headers });
    const status = response.data.status;
    if (status !== 200)
      throw new Error(`${response.data.message || "打卡请求失败"}`);
    log(`青年大学习${course_title}打卡成功`);
  } catch (e) {
    log(`青年大学习打卡失败：${e.message}`);
  }
};

module.exports = autoLearn;
