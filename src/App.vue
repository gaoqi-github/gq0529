<template>
<div class="todo-container">
    <div class="todo-wrap">
        <Header :addThing="addThing" />
        <Main :things="things" :updateThing="updateThing" :deleteThing="deleteThing" />
        <!-- <Footer :things="things" :updateAll="updateAll" :deleteAll="deleteAll" /> -->
        <!-- 全局事件总线通信 -->
        <Footer :things="things" :updateAll="updateAll" />
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
export default {
    components:{
        Header,
        Main,
        Footer
    },
    mounted() {
        this.$bus.$on("deleteAll", this.deleteAll)
    },
    data() {
        return {
            // things:[
            //     {id:1,content:"1111",isOver:false},
            //     {id:2,content:"2222",isOver:true},
            //     {id:3,content:"3333",isOver:false},
            // ],
            //读取localstorage里的数据
            things:JSON.parse(localStorage.getItem("things_key")) || []
        }
    },
    methods: {
        addThing(obj){
            this.things.unshift(obj);
        },
        updateThing(index,val){
            this.things[index].isOver = val
        },
        deleteThing(index){
            this.things.splice(index,1)
        },
        updateAll(val){
            this.things.forEach(item=>item.isOver = val)
        },
        deleteAll(){
            //删除isOver为true的删除，留下isOver为false的数据
            this.things = this.things.filter(item=>!item.isOver)
        }
    },
    //监视数据
    watch: {
        // things(newVal,oldVal){
        //     //一般监视,只能监视数据整体，不能监视内部数据改变
        //     //数据发生改变，就保存到localstorage
        //     //直接存储数据，默认会把数据调用对应的toString方法
        //     //对象 [object,Object] 数组 "中括号去掉加引号" 函数 "函数体"
        //     localStorage.setItem("things_key",JSON.stringify(newVal))
        // }

        //深度监视
        things:{
            deep:true,
            handler(newVal,oldVal){
                localStorage.setItem("things_key",JSON.stringify(newVal))
            }
        }
    },
}
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>
