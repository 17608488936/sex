import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import devConfig from "./dev";
import prodConfig from "./prod";
/**
 * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
const CIPluginOpt = {
  weapp: {
    appid: "微信小程序appid",
    privateKeyPath:
      "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key",
  },
  tt: {
    email: "字节小程序邮箱",
    password: "字节小程序密码",
  },
  alipay: {
    appid: "支付宝小程序appid",
    toolId: "工具id",
    privateKeyPath:
      "密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem",
  },
  dd: {
    appid: "钉钉小程序appid,即钉钉开放平台后台应用管理的 MiniAppId 选项",
    token: "令牌，从钉钉后台获取",
  },
  swan: {
    token: "鉴权需要的token令牌",
  },
  // 版本号
  version: "1.0.0",
  // 版本发布描述
  desc: "版本描述",
};

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, {}) => {
  const baseConfig: UserConfigExport = {
    projectName: "taro-app",
    date: "2023-12-26",
    // designWidth: 375,
    designWidth(input) {
      const filePath = ((input as any)?.file as string) || "";
      if (filePath.replace(/\\/g, "/").includes("@antmjs/vantui")) {
        return 750;
      }
      return 375;
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [
      "taro-plugin-compiler-optimization",
      "@taro-hooks/plugin-react",
      ["@tarojs/plugin-mini-ci", CIPluginOpt],
    ],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    // compiler: "webpack5",
    compiler: {
      type: "webpack5",
      // 仅 webpack5 支持依赖预编译配置
      prebundle: {
        enable: false,
      },
    },
    cache: {
      enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      miniCssExtractPluginOption: {
        //忽略css文件引入顺序
        ignoreOrder: true,
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            onePxTransform: false,
          },
        },
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js",
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
