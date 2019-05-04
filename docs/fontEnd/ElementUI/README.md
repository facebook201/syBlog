---
pageClass: getting-started
---

# ElementUI

## 表格全选保存数据问题

有的时候我们需要把表格的数据勾选保存起来 但是表格的数据是分页的，所以需要我们自己借助饿了么提供的方法和事件来实现。

* select 和 select-all 用户勾选和用户勾全选时候出发的事件
* 因为不知道（现在不知道是选中还是取消）所以当个的时候我们就用一个集合存起来，（handleSelect）判断是否有这个元素 如果有就删除 如果没有就push进去

```html
	<el-table
    ref="multipleTable"
    :data="cardData"
    @select="handleSelect"
    tooltip-effect="dark"
		@select-all="handleSelectAll">
	</el-table>
```


```javascript
/** this.middleSelection 保存我们最终选中的数据集合
 *  @param select  选中集合
 *  @param row     是选中的元素
 */
handleSelect(select, row) {
  if (this.middleSelection.length == 0) {
    this.middleSelection.push(row);
  } else {
  	// 如果不存在就增加 如果存在就减去
  	let index = this.middleSelection.findIndex(el => el.coupCardId == row.coupCardId);
    if (index == -1) {
      this.middleSelection.push(row);
    } else {
      this.middleSelection.splice(index, 1);
    }
  }
}

// 全选的时候 根据length判断 
handleSelectAll(val) {
  // 如果是全选 就判断里面的元素是否在middleSelection
  if (val.length) {
  	val.forEach((el, index) => {
      let inx = this.middleSelection.findIndex(item => item.coupCardId == el.coupCardId);
      // 如果没有找到就
      if (inx == -1) {
        this.middleSelection.push(el);
        }
      });
  } else {
  // 去掉
    this.cardData.forEach(el => {
    let ix = this.middleSelection.findIndex(item => item.coupCardId == el.coupCardId);
      if (ix != -1) {
        this.middleSelection.splice(ix, 1);
      }
    });
  }
}

// 每次分页切换请求数据的时候 给表格加上数据或删数据
this.$nextTick(_ => {
  if (this.cardData.length) {
    this.cardData.forEach(row => {
      let ret = this.middleSelection.find(el => el.coupCardId == row.coupCardId);
      if (ret) {
        // 如果不存在
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    });
  }
});

// 还有一种是删除
handleCloseTag(tag) {
  let index = this.middleSelection.findIndex(el => el.coupCardId == tag.coupCardId);
  if (index > -1) {
    // 这里要使用cardData的元素
    let row = this.middleSelection[index];
    let tag = this.cardData.find(el => el.coupCardId == row.coupCardId);
		// 切换表格的状态 调用组件暴露的方法
    if (tag) {
      this.$refs.multipleTable.toggleRowSelection(tag);
    }
    // 删除不是当前页
    this.middleSelection.splice(index, 1);
  }
}

```








<br />

## 功能
