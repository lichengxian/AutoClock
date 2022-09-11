const crypto = require("crypto"); // 加密相关
const fs = require("fs"); // 解析文件
const path = require("path"); // 路径相关

// 延迟一定时间
async function delay(time) {
  return new Promise((r) => setTimeout(r, time));
}

// 写入日志
const log_path = path.join(__dirname, "./log.txt");
const log = (string) => {
  const str = `[${new Date().toLocaleString()}]: ` + string + "\n";
  if (!fs.existsSync(log_path)) fs.writeFileSync(log_path, str);
  else {
    const context = fs.readFileSync(log_path);
    fs.writeFileSync(log_path, context + str);
  }
};

// 解密
const decode = (str, secret) => {
  const decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    secret,
    "0123456789abcdef"
  );
  const strings = decipher.update(str, "hex", "utf8") + decipher.final("utf8");
  return strings.split(" ");
};

module.exports = {
  delay,
  log,
  decode,
  log_path,
};
