<template>
  <div class="subscription-signup-card" v-if="showSubscriptionSignupCard">
    <subscription-card
      :class="subscriptionCardClasses"
      :style="subscriptionCardStyles"
    >
      <template #thumbnail>
        <SubscriptionIcon size="large" :color="color"></SubscriptionIcon>
      </template>
      <template #header>
        {{ product.title }}
      </template>
      <template #meta>
        <ProductPrice
          :price="product.price"
          :salePrice="product.salePrice"
          :unit="product.meta.unit"
        ></ProductPrice>
      </template>
      <template #description>
        <div
          class="line"
          v-for="(line, index) in product.description"
          :key="index"
        >
          {{ line }}
        </div>
      </template>
      <template #action>
        <button class="button outline" @click="onClickActionButton">
          {{ actionButtonText }}
        </button>
      </template>
    </subscription-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ProductPrice from '@/product/components/product-price.vue';
import SubscriptionIcon from '@/subscription/components/subscription-icon.vue';
import SubscriptionCard from '@/subscription/components/subscription-card.vue';

export default defineComponent({
  name: 'SubscriptionSignupCard',

  /**
   * 属性
   */
  props: {
    product: {
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
  computed: {
    ...mapGetters({
      selectedSubscriptionType: 'product/select/selectedSubscriptionType',
      currentStepName: 'subscription/signup/currentStepName',
    }),

    subscriptionType() {
      return this.product.meta.subscriptionType;
    },

    color() {
      return this.product.meta.color;
    },

    subscriptionCardClasses() {
      return ['colored', 'shadow', { stack: this.selectedSubscriptionType }];
    },

    subscriptionCardStyles() {
      return { '--color': this.color };
    },

    isSelected() {
      return this.subscriptionType === this.selectedSubscriptionType;
    },

    actionButtonText() {
      let actionButtonText = '选择';

      if (this.isSelected) {
        actionButtonText = '重新选择';
      }

      return actionButtonText;
    },

    showSubscriptionSignupCard() {
      return this.selectedSubscriptionType ? this.isSelected : true;
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
      setCurrentStepName: 'subscription/signup/setCurrentStepName',
      setSelectedSubscriptionType: 'product/select/setSelectedSubscriptionType',
    }),

    ...mapActions({}),

    onClickActionButton() {
      if (!this.selectedSubscriptionType) {
        this.setSelectedSubscriptionType(this.subscriptionType);
        this.setCurrentStepName('payment');
        return;
      }

      if (this.currentStepName === 'payment') {
        this.setSelectedSubscriptionType('');
        this.setCurrentStepName('select');
        return;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    SubscriptionCard,
    SubscriptionIcon,
    ProductPrice,
  },
});
</script>

<style scoped>
@import './styles/subscription-signup-card.css';
</style>
