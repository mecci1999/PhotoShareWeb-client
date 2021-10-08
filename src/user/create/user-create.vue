<template>
  <div class="user-create">
    <div class="form">
      <h1 class="header">用户注册</h1>
      <TextField v-model="name" placeholder="用户名" />
      <TextField v-model="password" placeholder="密码" type="password" />
      <TextField
        v-show="hasPassword"
        v-model="passwordAgain"
        placeholder="再次输入密码"
        type="password"
      />
      <ButtonField text="注册" size="large" />
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
import { mapGetters, mapMutations } from 'vuex';
import ButtonField from '@/app/components/button-field.vue';
import TextField from '@/app/components/text-field.vue';

export default defineComponent({
  name: 'UserCreate',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
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
