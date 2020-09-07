<template>
<div class="layout">
  <div class="translate">
      <h1>翻译</h1>
      <div class="body">
          <form>
            <div class="choose">
                <select name="chosse" id="" @change="choose()" ref="newText">
                    <option :value="item.value" v-for="(item,index) of languages" :key="index">{{item.id}}</option>
                </select>
                <span class="icon"><img src="../../static/images/转换.png"></span>
                <select name="trans" @change="trans()" ref="newText2">
                    <option :value="item.value" v-for="(item,index) of languages2" :key="index">{{item.id}}</option>
                </select>
            </div>
            <div class="input">
                <textarea v-model="text" name="" id="" cols="30" rows="10" placeholder="请输入需要翻译的内容"></textarea>
            </div>
            <span><img src="../../static/images/转换.png"></span>
            <div class="input">
                <textarea readonly="readonly" v-model="transtext" name="" id="" cols="30" rows="10"></textarea>
            </div>
          </form>
      </div>
      <div class="hist-btn" @click="isshow">
          <div class="img"><img src="../../static/images/历史纪录.png"/></div>
          <h2>历史纪录</h2>
      </div>
  </div>
  <div class="hist" v-if="hide">
      <div class="header">
          <div class="hd-l">历史纪录</div>
          <div class="hd-r" @click="isshow2"><img src="../../static/images/icon_close.png"/></div>
      </div>
      <div class="nav">
          <div class="nav-l">{{num}}条翻译</div>
          <div class="nav-r" @click="remove">清除历史纪录</div>
      </div>
      <div class="list">
          <ul>
              <li v-for="(item,index) of translist" :key="index">
                  <div class="hd">{{item.notranslate}} → {{item.translate}}</div>
                  <div class="bd">
                      <p>{{item.text}}</p><br/>
                      <p>{{item.trantext}}</p>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</div>  
</template>

<script>
export default {
    data(){
        return{
            hide:false,
            text:'',
            date:Date.now(),
            transtext:'',
            left:'auto',
            right:'zh',
            txt:'中文',
            txt2:'自动检测',
            index:'',
            num:'',
            translist : [],
            languages:[
                {id:'自动检测',value:'auto'},
                {id:'粤语',value:"yue"},
                {id:'韩语',value:"kor"},
                {id:'泰语',value:"th"},
                {id:'葡萄牙语',value:"pt"},
                {id:'希腊语',value:"el"},
                {id:'保加利亚语',value:"bul"},
                {id:'芬兰语',value:"fin"},
                {id:'斯洛文尼亚语',value:"slo"},
                {id:'繁体中文',value:"cht"},
                {id:'中文',value:"zh"},
                {id:'文言文',value:"wyw"},
                {id:'法语',value:"fra"},
                {id:'阿拉伯语',value:"ara"},
                {id:'德语',value:"de"},
                {id:'荷兰语',value:"nl"},
                {id:'爱沙尼亚语',value:"est"},
                {id:'捷克语',value:"csc"},
                {id:'瑞典语',value:"swe"},
                {id:'越南语',value:"vie"},
                {id:'英语',value:"en"},
                {id:'日语',value:"jp"},
                {id:'西班牙语',value:"spa"},
                {id:'俄语',value:"ru"},
                {id:'意大利语',value:"it"},
                {id:'波兰语',value:"pl"},
                {id:'丹麦语',value:"dan"},
                {id:'罗马尼亚语',value:"rom"},
                {id:'匈牙利语',value:"hu"}
            ],
            languages2:[
                {id:'中文',value:"zh"},
                {id:'粤语',value:"yue"},
                {id:'韩语',value:"kor"},
                {id:'泰语',value:"th"},
                {id:'葡萄牙语',value:"pt"},
                {id:'希腊语',value:"el"},
                {id:'保加利亚语',value:"bul"},
                {id:'芬兰语',value:"fin"},
                {id:'斯洛文尼亚语',value:"slo"},
                {id:'繁体中文',value:"cht"},
                {id:'文言文',value:"wyw"},
                {id:'法语',value:"fra"},
                {id:'阿拉伯语',value:"ara"},
                {id:'德语',value:"de"},
                {id:'荷兰语',value:"nl"},
                {id:'爱沙尼亚语',value:"est"},
                {id:'捷克语',value:"csc"},
                {id:'瑞典语',value:"swe"},
                {id:'越南语',value:"vie"},
                {id:'英语',value:"en"},
                {id:'日语',value:"jp"},
                {id:'西班牙语',value:"spa"},
                {id:'俄语',value:"ru"},
                {id:'意大利语',value:"it"},
                {id:'波兰语',value:"pl"},
                {id:'丹麦语',value:"dan"},
                {id:'罗马尼亚语',value:"rom"},
                {id:'匈牙利语',value:"hu"}
            ]
        }
    },
    computed:{    //百度翻译api所需要的验证条件
        string1(){
            var string1 = '20200905000559489'+this.text+this.date+'rrMP6pYuFPOGP1EEDHYV'
            return string1
        },
        sign(){
            var sign = this.$md5(this.string1).toLowerCase()
            return sign
        },
        data(){
            var data = 'q=' + this.text + '&from=' + this.left + '&to=' + this.right + '&appid=20200905000559489&salt=' + this.date + '&sign=' + this.sign;
            return data;
        }
    },
    mounted() {  //在页面初次渲染时发送一次请求调用本地存储的数据
       var keylen = sessionStorage.length  //获取本地存储了多少数据
       this.num = keylen
       for(var i=0;i<keylen;i++){    //将本地存储的所有数据循环遍历，然后赋值
            this.translist[i] = JSON.parse(sessionStorage.getItem(i))
       } 
    //    console.log(this.translist)   
    },
    watch:{
        text:{
            handler(){
                if(this.text.length > 0){   //监听输入框，如果有输入则发送请求
                        this.$jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate?'+this.data).then(res=>{
                            // console.log(res)
                        this.transtext = res.trans_result[0].dst  //将翻译后的数据赋值
                        // 存储值：将对象转换为Json字符串
                        this.index = sessionStorage.length   //获取此时一共有多少条数据
                        var trans = {   //定义需要存储的数据
                            translate:this.txt,
                            notranslate:this.txt2,
                            text:this.text,
                            trantext:this.transtext
                        }
                        sessionStorage.setItem(this.index, JSON.stringify(trans)); //存储数据，index所谓key值
                         var keylen = sessionStorage.length
                          this.num = keylen
                        for(var i=0;i<keylen;i++){
                                this.translist[i] = JSON.parse(sessionStorage.getItem(i))
                        }    
                    }).catch((e)=>{})
                }
            }
            
        }
    },
    methods:{
         choose(){   //输入语言选择，将获得value值通过switch判断赋值中文
            this.left = this.$refs.newText.value
            // console.log(this.left)
            switch(this.left){
                case 'auto':this.txt = '自动检测'
                break;
                 case 'yue':this.txt = '粤语'
                break;
                 case 'kor':this.txt = '韩语'
                break;
                 case 'th':this.txt = '泰语'
                break;
                 case 'el':this.txt = '希腊语'
                break;
                 case 'bul':this.txt = '保加利亚语'
                break;
                 case 'fin':this.txt = '芬兰语'
                break;
                 case 'slo':this.txt = '斯洛文尼亚语'
                break;
                 case 'cht':this.txt = '繁体中文'
                break;
                 case 'zh':this.txt = '中文'
                break;
                 case 'pt':this.txt = '葡萄牙语'
                break;
                 case 'wyw':this.txt = '文言文'
                break;
                 case 'ara':this.txt = '阿拉伯语'
                break;
                 case 'de':this.txt = '德语'
                break;
                 case 'nl':this.txt = '荷兰语'
                break;
                 case 'est':this.txt = '爱沙尼亚语'
                break;
                 case 'cs':this.txt = '捷克语'
                break;
                 case 'swe':this.txt = '瑞典语'
                break;
                 case 'vie':this.txt = '越南语'
                break;
                 case 'en':this.txt = '英语'
                break;
                 case 'jp':this.txt = '日语'
                break;
                case 'spa':this.txt = '西班牙语'
                break;
                case 'ru':this.txt = '俄语'
                break;
                case 'it':this.txt = '意大利语'
                break;
                case 'pl':this.txt = '波兰语'
                break;
                case 'dan':this.txt = '丹麦语'
                break;
                 case 'rom':this.txt = '罗马尼亚语'
                break;
                 case 'hu':this.txt = '匈牙利语'
                break;
            }
            this.$jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate?'+this.data).then(res=>{  //选择语言后重新发送请求，实现实时翻译
                 this.transtext = res.trans_result[0].dst
                     // 存储值：将对象转换为Json字符串
                        this.index = sessionStorage.length
                        var trans = {
                            translate:this.txt,
                            notranslate:this.txt2,
                            text:this.text,
                            trantext:this.transtext
                        }
                        sessionStorage.setItem(this.index, JSON.stringify(trans));
                         var keylen = sessionStorage.length
                        for(var i=0;i<keylen;i++){
                                this.translist[i] = JSON.parse(sessionStorage.getItem(i))
                        } 
                       
            }).catch((e)=>{})
            // console.log(this.txt)
        },
        trans(){   //输出语言的选择事件
            this.right = this.$refs.newText2.value;
            // console.log(this.right)
            switch(this.right){
                 case 'yue':this.txt2 = '粤语'
                break;
                 case 'kor':this.txt2 = '韩语'
                break;
                 case 'th':this.txt2 = '泰语'
                break;
                 case 'el':this.txt2 = '希腊语'
                break;
                 case 'bul':this.txt2 = '保加利亚语'
                break;
                 case 'fin':this.txt2 = '芬兰语'
                break;
                 case 'slo':this.txt2 = '斯洛文尼亚语'
                break;
                 case 'cht':this.txt2 = '繁体中文'
                break;
                 case 'zh':this.txt2 = '中文'
                break;
                 case 'wyw':this.txt2 = '文言文'
                break;
                 case 'pt':this.txt = '葡萄牙语'
                break;
                 case 'ara':this.txt2 = '阿拉伯语'
                break;
                 case 'de':this.txt2 = '德语'
                break;
                 case 'nl':this.txt2 = '荷兰语'
                break;
                 case 'est':this.txt2 = '爱沙尼亚语'
                break;
                 case 'cs':this.txt2 = '捷克语'
                break;
                 case 'swe':this.txt2 = '瑞典语'
                break;
                 case 'vie':this.txt2 = '越南语'
                break;
                 case 'en':this.txt2 = '英语'
                break;
                 case 'jp':this.txt2 = '日语'
                break;
                case 'spa':this.txt2 = '西班牙语'
                break;
                case 'ru':this.txt2 = '俄语'
                break;
                case 'it':this.txt2 = '意大利语'
                break;
                case 'pl':this.txt2 = '波兰语'
                break;
                case 'dan':this.txt2 = '丹麦语'
                break;
                 case 'rom':this.txt2 = '罗马尼亚语'
                break;
                 case 'hu':this.txt2 = '匈牙利语'
                break;
            }
            this.$jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate?'+this.data).then(res=>{
                 this.transtext = res.trans_result[0].dst
                     // 存储值：将对象转换为Json字符串
                        this.index = sessionStorage.length
                        var trans = {
                            translate:this.txt,
                            notranslate:this.txt2,
                            text:this.text,
                            trantext:this.transtext
                        }
                        sessionStorage.setItem(this.index, JSON.stringify(trans));
                         var keylen = sessionStorage.length
                         this.num = keylen
                        for(var i=0;i<keylen;i++){
                                this.translist[i] = JSON.parse(sessionStorage.getItem(i))
                        }
                       
            }).catch((e)=>{})
            // console.log(this.txt2)
        },
        isshow(){
            this.hide = true
        },
        isshow2(){
            this.hide = false
        },
        remove(){  //点击事件，清除本地存储
            sessionStorage.clear()
            this.translist = []   //清除数据后让清空数据，实现渲染
            var keylen = sessionStorage.length  //获取清空后本地存储的数据数量
            this.num = keylen                   //赋值给num渲染
        }
    }
}
</script>

<style scoped>
    .translate h1{
        text-align: center;
        font-size: 32px;
        margin-top:50px;
    }
    .translate .body{
        margin-top:30px;
    }
    .translate .input{
        width:500px;
        height:300px;
        border:1px solid gray;
        float: left;
        font-size: 20px;
        overflow: hidden;
    }
    .translate .input:last-child{
        float: right;
    }
    .translate .input textarea{
       width:93.5%;
        height:100%;
        padding-top:30px;
        padding-left:30px;
        margin-right: 30px;
    }
    .translate span{
        line-height: 300px;
        margin-left:80px;
    }
    .translate select{
        width:100px;
        height:30px;
        border:1px solid gray;
        margin-bottom: 30px;
        display: block;
        float: left;
    }
    .translate .choose{
        height: 40px;
        overflow: hidden;
    }
    .translate span.icon{
        display: block;
        float: left;
        width:32px;
        height:32px;
        margin-left:10px;
        margin-top:5px;
        line-height: 0;
        margin-left:10px;
        margin-right: 10px;
        margin-top:0;
    }
    .hist-btn{
        margin-top:30px;
        cursor: pointer;
    }
    .hist-btn .img{
        width:64px;
        height:64px;
        margin:0 auto;
    }
    .hist-btn h2{
        text-align: center;
        font-size: 30px;
        color: #333;
    }
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
    .hist .hd-l{
        float: left;
        line-height: 50px;
        font-size: 36px;
    }
    .hist .hd-r{
        float: right;
        margin-top:10px;
        cursor: pointer;
    }
    .hist .nav{
        height:30px;
        line-height: 30px;
        padding:0 10px;
        border-bottom:1px solid gray;
    }
    .hist .nav-l{
        float: left;
        font-size: 14px;
        color: #333;
    }
    .hist .nav-r{
        float: right;
        font-size: 14px;
        color: #333;
        cursor: pointer;
    }
    .hist .list{
        padding:0 10px;
        padding-top:20px;
    }
    .hist .list .hd{
        font-size: 16px;
    }
    .hist .list .bd{
        margin-top:0;
        text-align: left;
        padding:10px;
    }
    .hist .list .bd p{
        display: inline-block;
        font-size: 14px;
        color: #333;
        line-height: 1.8;
        position: relative;
        width:auto;
        margin-bottom: 15px;
    }
    .hist .list .bd p:first-child::after{
        content: "";
        background: url('../../static/images/转换2.png') no-repeat;
        background-size: cover;
        width:16px;
        height:16px;
        position: absolute;
        bottom:0;
        left:50%;
        transform: translateX(-50%);
        bottom:-15px;
    }
    form{
        overflow: hidden;
    }
    img{
        max-width:100%;
    }
     @media screen and (max-width:1200px){
        .translate h1 {
        text-align: center;
        margin-top:15px;
        font-size: 22px;
        }
        .translate .input{
            float: none;
            width:auto;
            height:200px;
        }
        .translate .input:last-child{
            float: none;
        }
        .translate span{
            display: block;
            line-height: 30px;
            margin-left: 0;
            text-align: center;
        }
        .hist-btn .img{
            width:39px;
            height: 39px;
        }
        .hist-btn h2{
            font-size: 16px;
        }
        .hist-btn{
            margin-top:10px;
        }
        .translate .input textarea{
            font-size: 14px;
        }
        .hist{
            width:100%;
        }
        .hist .list{
            overflow-y: scroll;
            height: 120%;
        }
        .hist .hd-l{
            font-size: 24px;
        }
}
</style>