<template>
  <div class="recharge">
    <RechargeInfo></RechargeInfo>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapMutations } from 'vuex';
import RechargeInfo from '@/recharge/components/recharge-info.vue';

export default defineComponent({
  name: 'Recharge',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {},

  /**
   * 已创建
   */
  async created() {
    this.setSelectedProductType('recharge');
    await this.getRechargeProduct();
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSelectedProductType: 'product/select/setSelectedProductType',
    }),
    ...mapActions({
      getRechargeProduct: 'product/show/getRechargeProduct',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    RechargeInfo,
  },
});
</script>

<style scoped>
@import './styles/recharge.css';
</style>
