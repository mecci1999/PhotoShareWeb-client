<template>
  <div class="auth-login">
    <div class="form">
      <h1 class="header">用户登录</h1>
      <TextField v-model="name" placeholder="用户名"></TextField>
      <TextField
        v-model="password"
        type="password"
        placeholder="密码"
      ></TextField>
      <ButtonField
        text="登录"
        size="large"
        @click="onClickLoginButton"
      ></ButtonField>
    </div>
    <div class="action">
      <router-link class="link" :to="registerLinkTo">
        注册 →
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TextField from '@/app/components/text-field.vue';
import ButtonField from '@/app/components/button-field.vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'AuthLogin',

  /**
   * 标题
   */
  title() {
    return '用户登录';
  },

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
      loading: 'auth/login/loading',
      loginResponseData: 'auth/login/loginResponseData',
    }),

    registerLinkTo() {
      return { name: 'userCreate' };
    },
  },

  /**
   * 已创建
   */
  created() {
    // 按下Enter键进行用户登录
    if (window) {
      window.addEventListener('keyup', this.onKeyUpEnterLogin);
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.removeEventListener('keyup', this.onKeyUpEnterLogin);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    onKeyUpEnterLogin(event) {
      // 如果是回车则执行登录
      if (event.key === 'Enter') {
        this.onClickLoginButton();
      }
    },

    ...mapActions({
      login: 'auth/login/login',
      pushMessage: 'notification/pushMessage',
    }),

    async onClickLoginButton() {
      try {
        const response = await this.login({
          name: this.name,
          password: this.password,
        });

        this.pushMessage({
          content: `欢迎回来， ${response.data.name}`,
        });

        this.$router.back();
      } catch (error) {
        this.pushMessage({
          content: error.data.message,
        });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    ButtonField,
  },
});
</script>

<style scoped>
@import './styles/auth-login.css';
</style>
