const { cfg } = require("./utils");
const autoClock = require("./SEUClock");
const autoLearn = require("./youthLearn");

// 主函数
const main = async () => {
  for (const user of cfg.users) {
    await autoClock(user.SEU, cfg.setting.delayTime);
    await autoLearn(user.lesson);
  }
};
main();
