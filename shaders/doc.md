

#### 有向距离场（Signed Distance Field）
是一种描述或存储点与场景物体表面位置关系的方式。当点在物体内部时距离为负数，在物体表面时距离为零，在物体外部时距离是正数，正是因为存在正负数所以叫Signed Distance Field而不是Distance Field，最大的作用是用于快速查询任意一点到场景中物体表面的最短距离。




##### 2DSDF 的应用
距离场广泛应用于文字，矢量图的渲染中。




#### 光线步进 RayMarching

