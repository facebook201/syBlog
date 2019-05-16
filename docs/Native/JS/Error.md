

# 错误处理机制
```javascript
function doSomething(action) {
  switch(action) {
    case 1:
      return 1;
    break;
    
    case 2:
      return 2;
    break;
    
    case 3:
      return 3;
    break;

    default:
      throw new Error('Invalid action');
  }
}

```





