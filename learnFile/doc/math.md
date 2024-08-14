
#### 点乘 dot
两个向量的点乘，结果是一个标量，表示两个向量在方向上的投影的乘积。点乘的公式为：a.b = |a| * |b| * cos(θ)，其中θ是两个向量之间的夹角。

* a . b > 0。方向相同 夹角在0到90°之间
* a . b < 0。方向相反 夹角在90°到180°之间
* a . b = 0。方向垂直 夹角为90°

**点乘可以判断物体在人的前面还是后面**

```js
// 判断物体在人的前面还是后面
function isFrontOfPerson(obj, person) {
  // 创建一个人指向物体的向量
  const direction = obj.position.sub(person.position);
  // 人的正前方
  const front =  new THREE.Vector3(0, 0, -1);;
  const dotProduct = direction.dot(front);
  return dotProduct > 0;
}

```

#### 叉乘 cross
两个向量的叉乘，结果是一个向量，表示两个向量在空间中的垂直分量。叉乘的公式为：a x b = |a| * |b| * sin(θ) * n，其中θ是两个向量之间的夹角，n是垂直于两个向量的单位向量。

* a x b > 0。右手螺旋法则，a在b的逆时针方向
* a x b < 0。右手螺旋法则，a在b的顺时针方向
* a x b = 0。方向平行


```js
// 叉乘不满足交换律 顺序不同结果也不同

const a = new THREE.Vector3(50, 0, 0);
const b = new THREE.Vector3(30, 0, 30);

const c = new THREE.Vector3();

// a叉乘b
c.crossVectors(a, b);
// b叉乘a
c.crossVectors(b, a);

// 
const arrowC = new THREE.ArrowHelper(c.clone().normalize(), O, c.length()/30,0x0000ff);
scene.add(arrowC);
```

#### 向量投影
向量a在向量b上的投影长度为：|a| * cos(θ)，其中θ是两个向量之间的夹角。



#### 四元数
setFromAxisAngle(axis, angle)生成的四元数表示绕axis旋转，旋转角度是angle。

```js
const quaternion = new THREE.Quaternion();
```
