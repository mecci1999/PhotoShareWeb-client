<template>
  <div class="weixin-login-account">
    <div class="form">
      <TextField v-model="name" placeholder="用户" />
      <TextField v-model="password" placeholder="密码" type="password" />
      <IconTextButton
        :icon="selectedConnectOption.icon"
        :text="submitButtonText"
        :isActive="isVerified"
        variations="fluid"
        @click="onClickSubmitButton"
      />
    </div>
    <div class="action">
      <button class="button basic fluid" @click="onClickSwitchOptionButton">
        {{ switchOptionButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import IconTextButton from '@/app/components/icon-text-button.vue';
import TextField from '@/app/components/text-field.vue';

export default defineComponent({
  name: 'WeixinLoginAccount',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      name: '',
      password: '',
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      selectedConnectOption: 'weixin/login/selectedConnectOption',
      connectOptions: 'weixin/login/connectOptions',
    }),

    isVerified() {
      return this.name && this.password ? true : false;
    },

    submitButtonText() {
      return `确定${this.selectedConnectOption.title}`;
    },

    nextOption() {
      return this.connectOptions.find(
        option => option.value !== this.selectedConnectOption.value,
      );
    },

    switchOptionButtonText() {
      return `${this.nextOption.title}`;
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
      setCurrentLoginStepName: 'weixin/login/setCurrentLoginStepName',
    }),

    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    async onClickSubmitButton() {
      try {
        switch (this.selectedConnectOption.value) {
          case 'varifyAccount':
            console.log(this.selectedConnectOption.title);
            break;
          case 'createAccount':
            console.log(this.selectedConnectOption.title);
            break;
        }
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    onClickSwitchOptionButton() {
      this.setCurrentLoginStepName(this.nextOption.value);
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    IconTextButton,
  },
});
</script>

<style scoped>
@import './styles/weixin-login-account.css';
</style>
