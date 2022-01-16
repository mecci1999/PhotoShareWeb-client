<template>
  <div class="subscription-select">
    <SubscriptionSelectOption
      v-for="option in subscriptionProducts"
      :key="option.meta.subscriptionType"
      :option="option"
      @change="onChangeSubscriptionSelectOption"
      :isActive="option.meta.subscriptionType === selectedSubscriptionType"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SubscriptionSelectOption from '@/subscription/components/subscription-select-option.vue';

export default defineComponent({
  name: 'SubscriptionSelect',

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
      subscriptionProducts: 'product/show/subscriptionProducts',
      selectedSubscriptionType: 'product/select/selectedSubscriptionType',
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
    ...mapMutations({
      setSelectedSubscriptionType: 'product/select/setSelectedSubscriptionType',
    }),

    ...mapActions({}),

    onChangeSubscriptionSelectOption(type) {
      this.setSelectedSubscriptionType(type);
    },
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionSelectOption,
  },
});
</script>

<style scoped>
@import './styles/subscription-select.css';
</style>
