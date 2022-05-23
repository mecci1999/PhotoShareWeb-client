<template>
  <div class="post-side-sheet-actions">
    <PaymentSelect :isUseAmountPayment="true" v-if="!canDownload" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PaymentSelect from '@/payment/select/payment-select.vue';

export default defineComponent({
  name: 'PostSideSheetActions',

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
  computed: {
    ...mapGetters({
      canDownload: 'download/canDownload',
    }),
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
    ...mapMutations({}),
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    PaymentSelect,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-actions.css';
</style>
