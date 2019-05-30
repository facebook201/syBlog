---
pageClass: getting-started
---

# 获取URL的查询参数


### 正则

```javascript
let q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v);
```

### URLSearchParams
```javascript
var urlParams = new URLSearchParams('?post=1234&action=edit');
console.log(urlParams.has('post')); 
console.log(urlParams.get('action')); // "edit"
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString()); // "?post=1234&action=edit"
console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"
```

<br />

