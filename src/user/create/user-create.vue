<template>
  <div class="user-create">
    <div class="form">
      <h1 class="header">用户注册</h1>
      <TextField v-model="name" placeholder="用户名" />
      <TextField v-model="password" placeholder="密码" type="password" />
      <TextField
        v-show="hasPassword"
        v-model="passwordAgain"
        placeholder="请再次输入密码"
        type="password"
      />
      <ButtonField
        text="注册"
        size="large"
        :type="registerButtonType"
        @click="onClickRegisterButton"
      />
    </div>
    <div class="action">
      <router-link class="link" :to="loginLinkTo">
        登录 ←
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ButtonField from '@/app/components/button-field.vue';
import TextField from '@/app/components/text-field.vue';

export default defineComponent({
  name: 'UserCreate',

  /**
   * 标题
   */
  title() {
    return '用户注册';
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
      passwordAgain: '',
      hasPassword: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({}),

    loginLinkTo() {
      return { name: 'login' };
    },

    registerButtonType() {
      return this.name && this.password ? '' : 'outline';
    },
  },

  /**
   * 监视
   */
  watch: {
    password(value) {
      if (value.trim()) {
        this.hasPassword = true;
      } else {
        this.hasPassword = false;
      }
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
    ...mapMutations({}),

    ...mapActions({
      createUser: 'user/create/createUser',
      pushMessage: 'notification/pushMessage',
      login: 'auth/login/login',
    }),

    async onClickRegisterButton() {
      if (this.passwordAgain.trim()) {
        if (this.passwordAgain !== this.password) {
          this.pushMessage({ content: '两次密码输入不一致，请修改' });
          return;
        }
      }

      const data = {
        name: this.name,
        password: this.password,
      };

      try {
        await this.createUser({ data });
        await this.login(data);

        // 登录成功后，跳转页面到首页
        this.$router.replace({ name: 'home' });

        this.pushMessage({ content: '注册成功并登录！' });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
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
@import './styles/user-create.css';
</style>
