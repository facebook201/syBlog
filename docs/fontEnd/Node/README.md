
# Node

## import、require、export、module.exports 使用

* 为何有的地方使用 require 去引用一个模块时需要加上 default？ require('xx').default
* 经常在各大UI组件引用的文档上会看到说明 import { button } from 'xx-ui' 这样会引入所有组件内容，需要添加额外的 babel 配置，比如 babel-plugin-component？
* 为什么可以使用 es6 的 import 去引用 commonjs 规范定义的模块，或者反过来也可以又是为什么？
* 我们在浏览一些 npm 下载下来的 UI 组件模块时（比如说 element-ui 的 lib 文件下），看到的都是 webpack 编译好的 js 文件，可以 使用 import 或 require 再去引用。但是我们平时编译好的 js 是无法再被其他模块 import 的，这是为什么？
* babel 在模块化的场景中充当了什么角色？以及 webpack ？哪个启到了关键作用？
* 听说 es6 还有 tree-shaking 功能，怎么才能使用这个功能？


### webpack 模块化原理



### babel 的作用

babel专门用于处理 ES6转换 ES5。webpack 跟 babel差不多，不过 webpack原生转换多做一步静态分析，使用 tree-shaking 技术。

:::tip
 babel 能提前将 ES6的 import 等模块关键字转换成 commonjs 规范，这样 webpack就无需再处理，直接运行webpack定义的 __webpack_require__ 处理
:::




:::tip exports 和 module.exports的区别
一句话来说明就是，require方能看到的只有module.exports这个对象，它是看不到exports对象的，而我们在编写模块时用到的exports对象实际上只是对module.exports的引用。
我们可以给exports上面添加属性、修改属性 但是不能直接赋值。如果直接赋值 那么两者直接就没有联系
:::


<br />
