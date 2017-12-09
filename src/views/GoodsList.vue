<template>
  <div>
    <!--header 组件-->
    <nav-header></nav-header>

    <!--面包屑 组件-->
    <nav-bread>
      <span slot="homeChild">Goods</span>
    </nav-bread>

    <!--商品列表详细内容-->
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <!--<a href="javascript:void(0)" class="default cur">Default</a>-->
          <a @click="sortGoods" href="javascript:void(0)" class="price">
            Price
            <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceSelected=='all'}" @click="priceSelected='all',closePop()">All</a></dd>
              <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" v-bind:class="{'cur':priceSelected==index} ">
                  {{price.startPrice}} - {{price.endPrice}}
                </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车中!
     </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="#" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>

    <!--footer 组件-->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import Header from '../components/NavHeader.vue'
  import Footer from '../components/NavFooter.vue'
  import Bread from '../components/NavBread.vue'
  import Modal from '../components/Modal.vue'
  //使用axios插件
  import axios from 'axios'

  export default{
    data(){
      return {
        goodsList: [],  //商品列表信息
        priceFilter: [
          {
            startPrice: 0.00,
            endPrice: 99
          },
          {
            startPrice: 100.00,
            endPrice: 499
          },
          {
            startPrice: 500.00,
            endPrice: 999
          },
          {
            startPrice: 1000.00,
            endPrice: 1999
          },
          {
            startPrice: 2000.00,
            endPrice: 4999
          }
        ],
        sortFlag: true,  //控制在数据库中查询时价格排序
        page: 1,   //当前页号
        pageSize: 8,   //每页商品条数
        loading:false,  //是否显示加载中图片
        busy: true,  //控制分页加载是否禁用
        priceSelected: 'all',
        filterBy: false,
        overLayFlag: false,
        mdShow:false,  //父子组件通信的变量，true显示子组件modal，false关闭modal
        mdShowCart:false,   ////显示加入购物车成功
      }
    },
    methods:{
      getGoodsList(flag){
        var param = {
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          priceLevel:this.priceSelected,  // 选择价格区间参数
        }
        this.loading = true;
        axios.get("/goods/list",{
            params:param
        }).then((response)=>{
          let res = response.data;
          this.loading = false;
          if(res.status=="0"){
            // 分页累计
            if(flag){
              this.goodsList = this.goodsList.concat(res.result.list);
              // 数据查询完，滚动禁用
              if(res.result.count == 0){
                  this.busy = true;
              }
              else{
                  this.busy = false;
              }
            }
            // 不需要数据累加
            else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          }
          else {
            this.goodsList = [];
          }
        });
      },
      sortGoods(){
        this.sortFlag = !this.sortFlag;
        this.page = 1;
//          console.log(this.sortFlag);
        this.getGoodsList();
      },
      setPriceFilter(index){
        this.priceSelected = index;
        this.page = 1;
        this.closePop();
      },
      // 向下滚动
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },
      showFilterPop(){    //打开右侧价格栏
        this.filterBy = true;   //设置为显示类
        this.overLayFlag = true;
      },
      closePop(){   //关闭右侧价格栏
        this.filterBy = false;
        this.overLayFlag = false;
        this.getGoodsList();
      },
      addCart(productId){
//          alert("添加购物车,PID: "+productId);
        axios.post("/goods/addCart",{
            productId:productId
        }).then((res)=>{
          var res = res.data;
          if(res.status==0){
//              console.log("msg:"+res.msg);
//              alert("添加购物车,PID: "+productId);
            this.$store.commit("updateCartCount",1);
            this.mdShowCart = true;
          }
          else {
//              alert("msg:"+res.msg);
//            打开当前未登录模态框
            this.mdShow = true;
          }
        });
      },
      closeModal() {
          this.mdShow = false;
          this.mdShowCart = false;
        },
//      点击添加购物车时更新右上角购物车总数
    },
    mounted() {  //加载时执行
      this.getGoodsList();
    },
    components:{   // components此页面包含的组件
      NavHeader: Header,
      NavFooter: Footer,
      NavBread: Bread,
      Modal,  //等价于 Modal: Modal
    }
  }
</script>
