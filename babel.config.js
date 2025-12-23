module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }] // runtime automatic لتجنب الحاجة لاستيراد React في كل ملف
  ]
};
