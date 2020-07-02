<template>
  <ul class="fly-list">
    <li v-for="(item,index) in list"
        :key="index">
      <a href="user/home.html"
         class="fly-avatar">
        <!-- <img :src="`http://localhost:3000${item.uid.pic}`" /> -->
        <img :src="item.uid.pic" />
      </a>
      <h2>
        <a class="layui-badge">动态</a>
        <a href>{{item.title}}</a>
      </h2>
      <div class="fly-list-info">
        <a href>
          <cite>{{item.uid.name}}</cite>
          <i class="iconfont icon-renzheng"
             title="认证信息：XXX"></i>
          <i class="layui-badge fly-badge-vip">VIP{{item.uid.isVip}}</i>
        </a>
        <span>{{parseTime(item.created)}}</span>

        <span class="fly-list-kiss layui-hide-xs"
              title="悬赏飞吻">
          <i class="iconfont icon-kiss"></i> 60
        </span>
        <!-- isEnd 0-未结束,1-已结贴 -->
        <span v-if="item.isEnd === '1'"
              class="layui-badge fly-badge-accept layui-hide-xs">已结贴</span>
        <span v-else-if="item.isEnd === '0'"
              class="layui-badge fly-badge-accept layui-hide-xs">未结帖</span>
        <span class="fly-list-nums">
          <i class="iconfont icon-pinglun1"
             title="回答"></i> {{item.answer}}
        </span>
      </div>
      <div class="fly-list-badge">
        <span class="layui-badge layui-bg-black">置顶</span>
        <span class="layui-badge layui-bg-red">精帖</span>
      </div>
    </li>
  </ul>
</template>
<script>
import { parseTime } from '@/utils/index'
export default {
  name: 'listitem',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    parseTime
  }
}
</script>

<style lang='less' scoped>
</style>