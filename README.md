# eslint-plugin-import-path

## 本插件用途
在项目禁用 import 相对路径方法。

## 本插件如何使用？
安装包
```
tnpm install eslint-plugin-import-path -D
```

## 项目中配置
`.eslintrc.js`
```
module.exports = {
    extends: [
        ...
        'plugin:eslint-plugin-import-path/recommended'
    ],
    plugins: [
        'import-path' // 省略 `eslint-plugin-` 前缀
    ],
    // 或单独指定规则
    // rules: {
    //     "import-path/no-relative-path": "error"
    // }
};
```

