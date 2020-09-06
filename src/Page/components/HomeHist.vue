<template>
  <div class="hist" v-if="hide">
      <div class="header">
          <div class="hd-l">历史纪录</div>
          <div class="hd-r" @click="isshow"><img src="../../../static/images/icon_close.png"/></div>
      </div>
      <div class="nav">
          <div class="nav-l">1条翻译</div>
          <div class="nav-r">清除历史纪录</div>
      </div>
      <div class="list">
          <ul v-for="(item,index) of translist" :key="index">
              <li>
                  <div class="hd">{{item.notranslate}} → {{item.translate}}</div>
                  <div class="bd">
                      <p>{{item.txt}}</p>
                      <p>{{item.trantext}}</p>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        hide:Boolean
    },
    data(){
       return{
        //    show:true
        translist : []
       }
    },
    methods:{
        isshow(){
            this.hide = false
            this.$emit('takehide',this.hide)
        }
    },
    mounted() {
       var keylen = sessionStorage.length
       for(var i=0;i<keylen;i++){
            this.translist[0] = JSON.parse(sessionStorage.getItem(i))
            this.translist.push(this.translist[0])
            // console.log(this.translist[0])
       }
        
        // var keylen = sessionStorage.length
        // var tranlist = new Array
        // for(var i=0;i<keylen;i++){
        //     tranlist.push(JSON.parse(sessionStorage.getItem(i)))
        //     console.log(tranlist[i])
        //     this.translist.push({notranslate:'',translate:''})
        //     console.log(this.translist.length)
        //     this.translist.notranslate = tranlist[i].notranslate
        //     this.translist.translate = tranlist[i].translate
        //     console.log(this.translist.notranslate)
        //     console.log(this.translist.translate)
        //     console.log(this.translist)
        // }
    }
}
</script>

<style scoped>
    .hist{
        width:400px;
        box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 10px;
        position: fixed;
        top:0;
        right: 0;
        z-index: 99999999;
        background: #ffffff;
        height: 100%;
    }
    .hist .header{
        height:50px;
        padding:0 10px;
        border-bottom: 1px solid gray;
    }
    .hd-l{
        float: left;
        line-height: 50px;
        font-size: 36px;
    }
    .hd-r{
        float: right;
        margin-top:10px;
        cursor: pointer;
    }
    .nav{
        height:30px;
        line-height: 30px;
        padding:0 10px;
        border-bottom:1px solid gray;
    }
    .nav-l{
        float: left;
        font-size: 14px;
        color: #333;
    }
    .nav-r{
        float: right;
        font-size: 14px;
        color: #333;
    }
    .list{
        padding:0 10px;
        padding-top:20px;
    }
    .list .hd{
        font-size: 12px;
    }
    .list .bd{
        margin-top:15px;
    }
    .list .bd p{
        font-size: 16px;
        color: #333;
        line-height: 1.8;
    }
</style>