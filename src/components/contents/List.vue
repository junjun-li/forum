<template>
  <div class="fly-panel"
       style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status === '' && tag === ''}"
         @click.prevent="search()">综合
      </a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '0'}"
         @click.prevent="search('0')">未结
      </a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '1'}"
         @click.prevent="search('1')">已结
      </a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '' && tag === '精华'}"
         @click.prevent="search('2')">精华
      </a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this': sort === 'created'}"
           @click.prevent="search('3')">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': sort === 'answer'}"
           @click.prevent="search('4')">按热议</a>
      </span>
    </div>
    <list-item :list="postList"></list-item>
    <div style="text-align: center">
      <div class="laypage-main">
        <a class="laypage-next">更多求解</a>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getPostList } from '@/api/index'

export default {
  name: 'list',
  components: {
    ListItem
  },
  data () {
    return {
      status: '',
      tag: '',
      sort: '',
      page: 0,
      limit: 20,
      postList: []
    }
  },
  created () {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getPostList()
  },
  methods: {
    async _getPostList () {
      const data = {
        page: this.page,
        limit: this.limit,
        catalog: this.catalog,
        sort: this.sort,
        status: this.status
      }
      const res = await getPostList(data)
      this.postList = res.data
    },
    search (val) {
      switch (val) {
        // 未结贴
        case '0':
          this.status = '0'
          this.tag = ''
          this._getPostList()
          break
        // 已结贴
        case '1':
          this.status = '1'
          this.tag = ''
          this._getPostList()
          break
        // 查询"精华"标签
        case '2':
          this.status = ''
          this.tag = '精华'
          break
        // 按照时间去查询
        case '3':
          this.sort = 'created'
          break
        // 按照评论数去查询
        case '4':
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          this._getPostList()
      }
    }
  },
  watch: {
    '$route' (newval, oldval) {

    }
  }
}
</script>

<style lang="scss"
       scoped>
a {
  cursor: pointer;
}
</style>
