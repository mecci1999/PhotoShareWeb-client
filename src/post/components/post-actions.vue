<template>
  <div class="post-actions">
    <button class="button large" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default defineComponent({
  name: 'PostActions',

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

  emits: ['update', 'create'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      postId: 'post/create/postId',
      title: 'post/create/title',
    }),

    submitButtonText() {
      return this.postId ? '更新' : '发布';
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
    ...mapActions({}),

    onClickSubmitButton() {
      if (!this.title.trim()) {
        this.pushMessage({ content: '内容标题不能为空' });
        return;
      }

      if (this.postId) {
        this.$emit('update');
      } else {
        this.$emit('create');
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-actions.css';
</style>
