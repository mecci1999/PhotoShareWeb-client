<template>
  <div class="user-amount">
    <div class="amount">¥ {{ user.amount }}</div>
    <div class="text">
      <div class="recharge">
        <router-link
          class="link"
          :to="{
            name: 'recharge',
            params: { userId: user.id },
          }"
          >充值</router-link
        >
      </div>
      <div>|</div>
      <div class="subscription">
        <router-link
          class="link"
          :to="{
            name: 'subscription',
            params: { userId: user.id },
          }"
          >订阅</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserAmount',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
    },
  },

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
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/user-amount.css';
</style>
