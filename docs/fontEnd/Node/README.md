
# Node

:::tip exports 和 module.exports的区别
一句话来说明就是，require方能看到的只有module.exports这个对象，它是看不到exports对象的，而我们在编写模块时用到的exports对象实际上只是对module.exports的引用。
我们可以给exports上面添加属性、修改属性 但是不能直接赋值。如果直接赋值 那么两者直接就没有联系
:::

<br />
