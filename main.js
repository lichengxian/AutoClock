const YAML = require("yamljs"); // 解析YAML文件
const fs = require("fs"); // 解析文件
const path = require("path"); // 路径相关
const { log_path } = require("./utils");
const autoLearn = require("./youthLearn");
const autoClock = require("./SEUClock")

// 读取配置文件
const yaml_file = path.join(__dirname, "./config.yaml");
const cfg = YAML.parse(fs.readFileSync(yaml_file).toString());

// 主函数
const main = async () => {
  if (fs.existsSync(log_path)) fs.unlinkSync(log_path); // 重新生成日志
  for (const user of cfg.users) {
    await autoClock(user, cfg.setting);
    await autoLearn(user.lesson);
  }
};
main();
