<template>
  <div class="dashboard-headbar">
    <div class="dashboard-headbar-select">
      <div :class="dashboardGlobalClasses" @click="onClickGlobalRange">
        全站
        <transition name="type-menu-list">
          <div class="type-menu" v-show="showTypeMenu">
            <div
              class="type-menu-item"
              v-for="item in selectTypeMenu"
              :key="item.name"
              @click.stop="onClickTypeMenuItem(item.name)"
            >
              {{ item.text }}
            </div>
          </div>
        </transition>
      </div>
      <div :class="dashboardPersonClasses" @click="onClickPersonRange">
        个人
      </div>
    </div>
    <DashboardFilterDatetime></DashboardFilterDatetime>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import DashboardFilterDatetime from './dashboard-filter-datetime.vue';

export default defineComponent({
  name: 'DashboardHeadbar',

  /**
   * 属性
   */
  props: {
    selectTypeMenu: {
      type: Array,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      showTypeMenu: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      selectedRange: 'dashboard/admin/selectedRange',
    }),

    dashboardGlobalClasses() {
      return [
        'dashboard-headbar-global',
        { select: this.selectedRange === 'global' },
      ];
    },

    dashboardPersonClasses() {
      return [
        'dashboard-headbar-person',
        { select: this.selectedRange === 'person' },
      ];
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSelectedRange: 'dashboard/admin/setSelectedRange',
      setDateTimeRange: 'dashboard/accessCount/setDateTimeRange',
      setCurrentAction: 'dashboard/accessCount/setCurrentAction',
      setCurrentRange: 'dashboard/accessCount/setCurrentRange',
    }),

    onClickGlobalRange() {
      this.setSelectedRange('global');

      // 显示分类菜单
      this.showTypeMenu = !this.showTypeMenu;
    },

    onClickPersonRange() {
      this.setSelectedRange('person');

      // 关闭分类菜单
      this.showTypeMenu = false;
    },

    onClickTypeMenuItem(name) {
      switch (name) {
        case 'global':
          this.setCurrentRange('global');
          break;
        case 'user':
          this.setCurrentRange('user');
          break;
        case 'post':
          this.setCurrentRange('post');
          break;
      }

      // 关闭菜单
      this.showTypeMenu = false;
    },
  },

  /**
   * 使用组件
   */
  components: {
    DashboardFilterDatetime,
  },
});
</script>

<style scoped>
@import './styles/dashboard-headbar.css';
</style>
