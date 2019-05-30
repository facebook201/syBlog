# Module

ES6之前有两种模块加载方案，CommonJS和AMD两种。ES6的模块思想是尽量的静态化，使得编译时就能确定模块的依赖关系。以及输入和输出的变量。



### 严格模式

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）



### export 和 import

export对外接口，import是用于输入其他模块提供功能。 一个模块就是独立的一个文件，该文件内部的所有变量，外部无法读取。

```javascript
export let firstName = 'Michael';
export let lastName = 'Jackson';
export let year = 1986;

// 也可以先定义
let firstName = 'Michael';
let lastName = 'Jackson';
let year = 1986;

export { firstName, lastName, year };

// import 用来加载相应的模块文件
import { firstName, lastName, year } from './profile.js';

```



### 整体模块加载 

使用星号 ( * ) 指定一个对象，所有输出值都加载这个对象上。

```javascript
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```



### export default命令

使用import命令的时候，用户需要知道索要加载的变量名或函数名，否则无法加载。**export default命令指定默认输出，如果指定默认的函数是个匿名函数，导出的时候就指定任意名字**

```javascript
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```



## CommonJS 

**CommonJS 是Node独有的规范，浏览器中使用就需要Browserify解析。**

* 所有代码都运行在模块作用域 不会污染全局作用域
* 模块可以加载多次，但是只会第一次加载时运行一次 然后运行结果就缓存了 以后再加载就直接读取缓存
* 模块加载顺序 按照代码中出现的顺序



### module.exports属性

module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。**module是Node独有的一个变量。**

```javascript
// 内部实现
var module = {
  exports: {} 
};
var exports = module.exports;
```

**不能直接对exports直接赋值，不会有任何效果。**



### ES6模块和CommonJS模块的差异

* 后者支持动态导入  也就是 require('xx.js') ES6暂时不支持

* CommonJS模块输出是一个值的拷贝，ES6模块输出是值的引用

* CommonJS模块是运行时加载 ES6是编译时输出接口

  

## AMD

AMD是有RequireJS提出

```javascript
// AMD
define(['./a', './b'], function(a, b) {
    a.do()
    b.do()
})
define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    var b = require('./b')
    b.doSomething()
})
```

