<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <list></list>
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'

export default {
  name: 'catalog',
  components: {
    'hot-list': HotList,
    ads: Ads,
    links: Links,
    list: List
  },
  created () {
    console.log(this.$route)
    console.log(this.$router)
  },
  watch: {
    '$route' (newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
    }
  }
}
</script>

<style lang="scss"
       scoped>
</style>
