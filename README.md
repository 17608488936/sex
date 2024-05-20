## 简介

- 全民营销小程序 - taro 版本

## 技术栈

- taroJS + React + Less Module + VantUI

## 启动项目

### 前置条件

- 依赖[node](https://nodejs.org/en)
- 推荐使用 pnpm 作为包管理工具 [pnpm 是凭什么对 npm 和 yarn 降维打击的](https://juejin.cn/post/7127295203177676837)

### 启动

- 移步阅读 [taro 启动命令](https://taro-docs.jd.com/docs/GETTING-STARTED#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F)

### 规范

#### css

- 命名规范

  - 命名要做到见名知意

    ```html
    <!-- ✅ 推荐 -->
    <div class="title">标题</div>

    <!-- ❌ 不推荐 -->
    <div class="a1">标题</div>
    ```

  - 单词小写 如 `text`

    ```html
    <!-- ✅ 推荐 -->
    <div class="title">标题</div>

    <!-- ❌ 不推荐 -->
    <div class="Title">标题</div>
    ```

  - 单词连接符用中横线 如 `text-red`

    ```html
    <!-- ✅ 推荐 -->
    <div class="text-red">标题</div>

    <!-- ❌ 不推荐 -->
    <div class="atextRed">标题</div>
    ```

  - 不要使用 标签选择器，使用 id 或者 class 选择器；因为 css 是从右往左解析的、如果设置了标签选择器，会给全局标签添加该样式，然后再找它的父级依次解析；直至解析完当前标签层级

    ```css
    <!-- ✅ 推荐 -->
    <style>
    .title-wrap .text-red {
        color: red
    }
    </style>

    <!-- ❌ 不推荐 -->
    <style>
    .title-wrap h1 {
        color: red
    }
    </style>

    ```

  - css 层级不要太深，最好不超过 3 层；因为 css 是从右往左解析，层级深会加长页面显示时间

  ```css
    <!-- ✅ 推荐 -->
    <style>
    .title-red {
        color: red
    }
    </style>

    <!-- ❌ 不推荐 -->
    <style>

    .title-wrap  {
        .text-red {
            .text-red {
                .text-red {
                    .text-red {
                        .text-red {
                            .text-red {
                                color: red
                            }
                        }
                    }
                }
            }
        }
    }
    </style>

  ```

#### taro

### ts
