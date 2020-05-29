<template>
  <li @mouseenter="handlerItem(true)" @mouseleave="handlerItem(false)" :class="myClass">
    <label>
      <input type="checkbox" v-model="isCheck" />
      <span>{{ thing.content }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteT" >删除</button>
  </li>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
      thing:Object,
      index:Number,
      updateThing:Function,
      deleteThing:Function
    },
    data() {
        return {
          //设置控制删除按钮显示隐藏的数据
          isShow:false,
          myClass:"leaveClass"
        }
    },
    computed: {
      isCheck:{
        get(){
          return this.thing.isOver
        },
        //点击选中，修改是否选中的值
        set(val){
          this.updateThing(this.index,val)
        }
      }
    },
    methods:{
      handlerItem(flag){
        // if(flag){
        //   this.isShow = true
        //   this.myClass = "enterClass"
        // }else{
        //   this.isShow = false
        //   this.myClass = "leaveClass"
        // }
        
        this.isShow = !this.isShow
        this.myClass = flag?"enterClass":"leaveClass"
      },
      deleteT(){
        this.deleteThing(this.index)
      }
    }
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

.enterClass{
  background-color: #aaa;
}
.leaveClass{
  background-color: #fff;
}
</style>
