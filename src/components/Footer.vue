<template>
<div class="todo-footer">
    <label>
        <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
        <span>已完成{{overNum}}</span> / 全部{{allNum}}
    </span>
    <button class="btn btn-danger" @click="deleteA">清除已完成任务</button>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
      things:{
        type:Array,
        default:[],
      },
      updateAll:Function,
      // deleteAll:Function //props通信,全局事件总线通信不需要
    },
    data() {
        return {
            complated:0
        }
    },
    computed: {
      overNum(){
        // 筛选数组中符合条件的数据，返回新数组
        // return this.things.filter(function(item,index){
        //   return item.isOver
        // })
        return this.things.filter(item=>item.isOver).length
      },
      allNum(){
        return this.things.length
      },
      isCheckAll:{
        get(){
          return this.overNum === this.allNum && this.allNum > 0
        },
        set(val){
          this.updateAll(val)
        }
      }
    },
    methods: {
      deleteA(){
        // this.deleteAll() //props调用
        //获取全局事件总线调用
        this.$bus.$emit("deleteAll")
      }
    },
}
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>
