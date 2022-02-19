<template>
  <div class="license-list">
    <LicenseListItem
      v-for="license in licenses"
      :key="license.id"
      :item="license"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LicenseListItem from '@/license/index/components/license-list-item.vue';

export default defineComponent({
  name: 'LicenseList',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      prevScrollTop: 0,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      licenses: 'license/index/licenses',
      hasMore: 'license/index/hasMore',
      loading: 'license/index/loading',
    }),
  },

  /**
   * 已创建
   */
  created() {
    this.getLicenses();

    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);
      window.scrollTo({ top: 0 });
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('scroll', this.onScrollWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),

    ...mapActions({
      getLicenses: 'license/index/getLicenses',
    }),

    onScrollWindow() {
      if (document) {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = document.documentElement;

        const height = clientHeight + scrollTop + 200;

        const touchDown = scrollHeight - height < 0;

        const scrollDown = scrollTop > this.prevScrollTop;

        if (touchDown && scrollDown && !this.loading && this.hasMore) {
          this.getLicenses();
        }

        this.prevScrollTop = scrollTop;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    LicenseListItem,
  },
});
</script>

<style scoped>
@import './styles/license-list.css';
</style>
