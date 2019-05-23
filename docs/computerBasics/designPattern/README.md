# 设计模式



## 表单验证函数

验证过程中我们需要做的事。要编写验证方法，然后调用验证方法得到结果，还有验证失败的提示。

```javascript
function validate(obj) {
  let reg;

  // 定义验证
  const validatorObj = {
    validator: {
      // 验证失败后的提示
      messages: {
        notNull: `请输入{xxx}`, // 不能为空
        max: ``, // 最长
        min: ``, // 最短
        length: ``, // 长度范围
        numer: ``, // 必须是数字
      },
      // 验证的方法 返回一个布尔值
      methods: {
        notNull: obj => {
          return obj.value || obj.value === 0;
        },
        max: obj => {
          if (!obj.value) return true;
        }
      }
    },
    // 得到验证结果
    checkResult: obj => {
      let result = true,
          checkType,
          message = '验证成功',
          validatorMethods = this.validator.methods,
          validatorMessage = this.validator.message;
      
      for(let i = 0, len = obj.rules.length; i < len; i++ ) {
        // 循环验证 
        if (!validatorMethods[obj.rules[i]](obj)) {
          checkType = obj.rules[i];
          result = false;
          break;
        }
      }

      // 如果验证失败 得到失败的结果集
      if (!result) {
        messgae = validatorMessage[checkType];
        if (obj.conditions) {
          obj.conditions.forEach((item, index) => {
            message = message.replace('{' + (index + 1) + '}', item);
          })
        }
        message = message.replace('{0}', obj.label);
        return { result, message };
      }
      return { result, message }          
    }
  };
  return validatorObj.checkResult(obj);
}

// 如何使用
validate({
  // 验证项
  label: 'username',
  // 验证项的
  value: 'admin',
  // 验证规则
  rules: ['notNull', 'length'],
  conditions: ['2', '10']
});
```

