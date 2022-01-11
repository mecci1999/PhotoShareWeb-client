<template>
  <div class="post-side-sheet-header-payment" v-if="selectedPayment">
    <div class="media">
      <div class="image">
        <AppQrcode></AppQrcode>
      </div>
    </div>
    <div class="header">
      {{ headerText }}
    </div>
    <div class="description">
      {{ selectedPayment.description }}
    </div>
    <div class="action">
      <button class="button basic" @click="onClickPaymentIconButton">
        <PaymentIcon :name="selectedPayment.name" :size="32"></PaymentIcon>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppQrcode from '@/app/components/app-qrcode.vue';
import PaymentIcon from '@/payment/components/payment-icon.vue';

export default defineComponent({
  name: 'PostSideSheetHeaderPayment',

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
      selectedPayment: 'payment/select/selectedPayment',
      selectedPaymentName: 'payment/select/selectedPaymentName',
      payments: 'payment/index/payments',
    }),

    headerText() {
      return '购买产品';
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
      setSelectedPaymentName: 'payment/select/setSelectedPaymentName',
    }),

    ...mapActions({}),

    onClickPaymentIconButton() {
      // 当前支付方法索引值
      let index = this.payments.findIndex(
        payment => payment.name === this.selectedPaymentName,
      );

      // 往后移一个或重新开始
      if (index + 1 === this.payments.length) {
        index = 0;
      } else {
        index++;
      }

      // 设置选择的支付方法
      this.setSelectedPaymentName(this.payments[index].name);
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppQrcode,
    PaymentIcon,
  },
});
</script>

<style scoped>
@import './styles/post-side-sheet-header-payment.css';
</style>
