<template>
  <div class="order-status-filter">
    <div class="header">状态</div>
    <div class="content">
      <CheckboxField
        class="compact"
        :useIcon="false"
        v-for="{ text, value } in fields"
        :key="text"
        :text="text"
        :value="value"
        name="status"
        type="radio"
        v-model="status"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CheckboxField from '@/app/components/checkbox-field.vue';

export default defineComponent({
  name: 'OrderStatusFilter',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      fields: [
        {
          value: '',
          text: '全部',
        },
        {
          value: 'pending',
          text: '待处理',
        },
        {
          value: 'completed',
          text: '完成',
        },
      ],
      status: '',
    };
  },

  /**
   * 监视
   */
  watch: {
    status(value) {
      const query = { ...this.$route.query };

      if (value) {
        query.status = value;
      } else {
        delete query.status;
      }

      this.$router.replace({ query });
    },
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({}),
  },

  /**
   * 已创建
   */
  created() {
    // 组件首次加载需要从获取status值
    const {
      query: { status },
    } = this.$route;

    // 进行判断，是否有status值
    if (status) {
      this.status = status;
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    CheckboxField,
  },
});
</script>

<style scoped>
@import './styles/order-status-filter.css';
</style>
