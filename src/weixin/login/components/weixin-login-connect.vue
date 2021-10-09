<template>
  <div class="weixin-login-connect">
    <div
      class="option"
      v-for="{ title, value, icon } in connectOptions"
      :key="value"
    >
      <IconTextButton
        :icon="icon"
        :text="title"
        variations="relaxed"
        @click="onClickOptionButton(value)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import IconTextButton from '@/app/components/icon-text-button.vue';

export default defineComponent({
  name: 'WeixinLoginConnect',

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
      connectOptions: 'weixin/login/connectOptions',
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
      setCurrentLoginStepName: 'weixin/login/setCurrentLoginStepName',
    }),

    onClickOptionButton(value) {
      this.setCurrentLoginStepName(value);
    },
  },

  /**
   * 使用组件
   */
  components: {
    IconTextButton,
  },
});
</script>

<style scoped>
@import './styles/weixin-login-connect.css';
</style>
