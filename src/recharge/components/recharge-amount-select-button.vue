<template>
  <div :class="rechargeAmountSelectButtonClasses">
    <CheckboxField
      :useIcon="false"
      v-for="{ text, value } in selectAmounts"
      :key="text"
      :text="text"
      :value="value"
      type="radio"
      v-model="_selectedAmount"
      name="recharge-selected-amount"
    ></CheckboxField>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CheckboxField from '@/app/components/checkbox-field.vue';

export default defineComponent({
  name: 'RechargeAmountSelectButton',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      isSelected: false,
      selectAmounts: [
        {
          text: '¥ 10',
          value: '10.00',
        },
        {
          text: '¥ 30',
          value: '30.00',
        },
        {
          text: '¥ 50',
          value: '50.00',
        },
        {
          text: '¥ 100',
          value: '100.00',
        },
        {
          text: '¥ 200',
          value: '200.00',
        },
        {
          text: '¥ 500',
          value: '500.00',
        },
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {
    rechargeAmountSelectButtonClasses() {
      return ['recharge-amount-select-button', { active: this.isSelected }];
    },
    ...mapGetters({
      selectedAmount: 'recharge/selectedAmount',
      currentOrder: 'order/create/currentOrder',
    }),

    _selectedAmount: {
      get() {
        return this.selectedAmount;
      },
      set(value) {
        this.setSelectedAmount(value);
      },
    },
  },

  /**
   * 监视
   */
  watch: {
    async selectedAmount(value) {
      this.setSelectedAmount(value);

      // // 更新当前订单信息动作
      // await this.updateOrder({
      //   orderId: this.currentOrder.id,
      //   data: {
      //     payment: this.currentOrder.payment,
      //     amount: value,
      //   },
      // });
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
      setSelectedAmount: 'recharge/setSelectedAmount',
    }),

    ...mapActions({
      updateOrder: 'order/edit/updateOrder',
    }),
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
@import './styles/recharge-amount-select-button.css';
</style>
