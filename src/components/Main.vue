<template>
<ul class="todo-main">
    <Item v-for="(thing, index) in things" 
    :key="thing.id" 
    :thing="thing" 
    :index="index" 
    :updateThing="updateThing" 
    :deleteThing="deleteThing" />
</ul>
</template>

<script type="text/ecmascript-6">
import Item from './Item'
export default {
  props:{//以对象的形式接收数据，可以规定数据的类型
      things:Array,
      updateThing:Function,
      deleteThing:Function
  },
  components:{
      Item
  }
}
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

</style>
