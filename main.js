const YAML = require("yamljs"); // 解析YAML文件
const fs = require("fs"); // 解析文件
const path = require("path"); // 路径相关
const { log_path, log } = require("./utils");
const autoLearn = require("./youthLearn");
const autoClock = require("./SEUClock");

// 读取配置文件
const yaml_file = path.join(__dirname, "./config.yaml");
const cfg = YAML.parse(fs.readFileSync(yaml_file).toString());

// 主函数
const main = async () => {
  // 日志文件大于50KB则清空
  if (fs.existsSync(log_path) && fs.statSync(log_path).size > 50 * 1024)
    fs.unlinkSync(log_path);
  log("");
  for (const user of cfg.users) {
    await autoClock(user, cfg.setting);
    await autoLearn(user.lesson);
  }
};
main();
