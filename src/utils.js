const yamljs = require("yamljs"); // 解析YAML文件
const path = require("path"); // 路径相关
const fs = require("fs"); // 解析文件

// 读取配置文件
const yaml_file = path.join(__dirname, "./config.yaml");
const cfg = yamljs.parse(fs.readFileSync(yaml_file).toString());
// 日志路径
const log_path = path.join(__dirname, "./log.txt");
// 日志文件大于50KB则清空
if (fs.existsSync(log_path) && fs.statSync(log_path).size > 50 * 1024)
  fs.unlinkSync(log_path);

// 延迟一定时间
const delay = async (time) => new Promise((r) => setTimeout(r, time));

// 写入日志
const log = (string) => {
  const str = `[${new Date().toLocaleString()}]: ` + string + "\n";
  if (!fs.existsSync(log_path)) fs.writeFileSync(log_path, str);
  else {
    const context = fs.readFileSync(log_path);
    fs.writeFileSync(log_path, str + context);
  }
};

module.exports = {
  cfg,
  delay,
  log,
};
