

## 反射机制

### 使用反射

使用反射，首先要得到 class 文件对象，其实也就是得到Class类的对象



Class 类主要API：

* 成员变量 —— Field
* 成员方法 —— Constructor
* 构造方法 —— Method



获取 class 文件对象的方式：

* 1、Objec 类的 getClass() 方法
* 2、数据类型的静态属性 class
* 3、Class 类中的静态方法 ForName(string className)



获取成员变量

* 1、获取Class对象
* ​    2、通过Class 对象获取 Constructor 对象
* ​    3、Object obj = Constructor.newInstance() 创建对象
* ​    4、Field field = Class.getField('指定变量名') 获取单个成员变量对象
* ​    5、field.set(obj, "") 为obj对象的field字段赋值



通过反射调用成员方法

* 1：获取Class对象
*  2：通过Class对象获取Constructor对象
*  3：Constructor.newInstance()创建对象
*  4：通过Class对象获取Method对象  ------getMethod("方法名");
*  5: Method对象调用invoke方法实现功能



如果调用的是私有方法那么需要暴力访问

* 1: getDeclaredMethod()
* 2: setAccessiable();



### 反射的功能



* 在运行中分析类的能力
* 在运行中查看和操作对象
  * 基于反射自由创建对象
  * 反射构建出无法直接访问的类
  * set 或者 get 到无法访问的成员变量
  * 调用不可访问的方法
* 实现通用的数据操作代码
* 类似函数指针的功能









### 注解 （Annotation）

* Override 注解表示子类要重写（override）父类对应方法

* Deprecated 注解表示方法是不建议被使用的

* SuppressWarnings 注解表示抑制警告

  

#### 自定义注解

当注解中的属性名为value时，在对其赋值时 可以不指定属性的名称而直接写上属性值即可，除了value以外的其他值都需要使用 name = value 这种赋值方式明确指定给谁赋值。

**可以给定默认值**

> 
>
> String value() default "hello";
>
> int age() default 23;
>
> // 如果是数组
>
> String[] value;
>
> @annotation(value={"hello", "world"})













































