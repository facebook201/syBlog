### 系统模块



Nodejs 采用的是 Commonjs 机制，通过 module.export 、require 来导出和引入一个模块。采用了延迟加载的策略。只有在用到的情况下，系统模块才会被加载，加载完成后会放到 binding_cache 中。



