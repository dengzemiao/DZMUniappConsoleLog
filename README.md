# Uniapp 日志工具（DZMUniappConsoleLog）

- `Uniapp` 控制台日志输出，简单易用，协助快速排查调试问题。

- 初始环境 `node：v14.15.0` `npm: v6.14.8`

- 支持：`vue2`、`vue3`

- 效果 
  
  ![demo](demo.gif)

## 一、简介

* 推荐用于记录所有的 `网络请求`、`catch错误`、`调试日志` ....

* 使用细节：

    1、日志开关使用暗门的方式进行开启，例如连点版本号多少下。
    
    2、启动后，例如可以长按某个文案，进入日志页面查看日志。
    
    3、日志设置开关状态，是本地会缓存的，可以在启动函数中调用读取缓存开关状态函数，确保第一时间使用上上次的开启状态，不读取默认是关闭状态。

* `Uniapp` 日志控制台输出案例：

    注意： `Log.add()` 怎么使用 `常规参数` 作为 `key`，例如：

    `Log.add({[Log.keySuccess]: false, [Log.keyTitle]: '添加失败日志', [Log.keyData]: { a: 1 }, b: 2})`
    
    ```js
    <script>
    import Log from '@/pages-log/index'
    export default {
        methods: {
            // 查看日志
            handleClick () {
                Log.go()
            },
            // 添加成功日志
            handleAddSuccess () {
                // 无数据，默认就是成功状态
                // Log.add()
                // 有数据
                Log.add({
                    // [Log.keyTitle]: '添加成功日志',
                    // 使用规定好的参数
                    // [Log.keyData]: {
                    //     a: 1
                    // },
                    // 使用未规定的参数
                    b: 2
                })
            },
            // 添加失败日志
            handleAddError () {
                Log.add({
                    // [Log.keySuccess]: false
                    // [Log.keyTitle]: '添加失败日志',
                    // [Log.keyData]: {
                    //     a: 1
                    // },
                    // 这么写也可以 == [Log.keySuccess]: false
                    success: false
                })
            }
        }
    }
    </script>
    ```

* 常规日志参数介绍

    ```js
    // 参数 Key，并不是只能传这些，额外字段可以随时添加不做限制，列出来固定只是方便统一管理，需要额外字段可以随意添加

    // ===>>>【 常用参数 Key 】

    //【非必填】日志标题，会有默认标题
    keyTitle: 'title',
    //【非必填】日志数据，存放日志数据
    keyData: 'data',
    //【非必填】日志状态，true 成功 false 失败/错误，会有不同的展示颜色，默认 true
    keySuccess: 'success',
    
    // ... 其他的都是无特殊需求不需要管的
    ```

## 二、导入使用

* 下载项目后，将 `pages-log` 文件夹作丢入项目中，并在 `pages.json` 中配置好页面路由

    ```json
    {
        "path": "pages-log/index",
        "style": {
			"navigationStyle": "default",
            "navigationBarTitleText": "日志"
        }
    }
    ```
    
    文件夹名或路由路径，都可以自行调整，调整后修改下 `/pages-log/index.js` 中 `go()` 函数的日志页面路由地址，主要是为了方便快捷跳转：

    ```js
    // 跳转日志页面，封装方便在其他页面使用，有需要可以调整页面路径
    go () {
      uni.navigateTo({
        url: '/pages-log/index'
      })
    },
    ```
    
* 可以通过 `go()` 函数跳转进入日志页面，推荐通过长按某个隐藏文案进入

    ```js
    // 查看日志
    handleLongClick () {
        Log.go()
    },
    ```
    
## 三、开关状态切换、同步

* 页面导入

    ```js
    import Log from '@/pages-log/index'
    ```

* 日志对象默认是关闭状态，需要通过隐藏的操作方法设置为开启，例如：连点版本号 `20` 下，通过下面方法进行设置开启，只有设置为开启才能进行日志记录：

    ```js
    // 设置开启，会本地缓存状态
    Log.setOpen(true)
    
    // 如果需要使用本地缓存状态，可以调用此方法，例如：项目生命周期的最开始调用此方法
    // 不调用则使用默认的关闭状态，需要每次手动启动日志开关，如果需要同步之前的开关状态，这个操作只需要在启动函数里面同步一次就行了，一般都是启动的时候需要从头到尾记录到日志，例如下面的：onLaunch 函数，不需要每个页面重复去同步。
    Log.getOpen()
    ```

    例如：

    ```js
    onLaunch: function() {
        // 初始化日志
        Log.getOpen()
        // ... 其他初始化操作
    },
    ```



