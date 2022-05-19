<template>
  <div class="dashboard-headbar">
    <div class="dashboard-headbar-select">
      <div :class="dashboardGlobalClasses" @click="onClickGlobalRange">
        {{ headerButtonText }}
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
      <div
        :class="dashboardPersonClasses"
        @click="onClickPersonRange"
        v-if="useAdmin"
      >
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
      currentRangeAdmin: 'dashboard/accessCount/currentRangeAdmin',
      currentRange: 'dashboard/user/currentRange',
      useAdmin: 'user/useAdmin',
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

    headerButtonText() {
      let text;
      if (this.useAdmin) {
        switch (this.currentRangeAdmin) {
          case 'global':
            text = '全站';
            break;
          case 'user':
            text = '用户';
            break;
          case 'post':
            text = '素材';
            break;
        }
      } else {
        switch (this.currentRange) {
          case 'other':
            text = '其它';
            break;
          case 'post':
            text = '作品';
            break;
        }
      }

      return text;
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
      setCurrentRangeAdmin: 'dashboard/accessCount/setCurrentRangeAdmin',
      setCurrentRange: 'dashboard/user/setCurrentRange',
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
      if (this.useAdmin) {
        switch (name) {
          case 'global':
            this.setCurrentRangeAdmin('global');
            break;
          case 'user':
            this.setCurrentRangeAdmin('user');
            break;
          case 'post':
            this.setCurrentRangeAdmin('post');
            break;
          case 'income':
            this.setCurrentRange('income');
            break;
        }
      } else {
        switch (name) {
          case 'post':
            this.setCurrentRange('post');
            break;
          case 'other':
            this.setCurrentRange('other');
            break;
        }
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
