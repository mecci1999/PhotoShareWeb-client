<template>
  <div class="post-status-field">
    <CheckboxField
      v-for="{ value, text } in statusField"
      :key="value"
      :value="value"
      :text="text"
      type="radio"
      name="status"
      v-model="postStatus"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CheckboxField from '@/app/components/checkbox-field.vue';

export default defineComponent({
  name: 'PostStatusField',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      statusField: [
        {
          value: 'draft',
          text: '仅自己可见',
        },
        {
          value: 'published',
          text: '公开',
        },
      ],
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      status: 'post/create/status',
      unsaved: 'post/create/unsaved',
    }),

    postStatus: {
      get() {
        return this.status;
      },

      set(value) {
        this.setStatus(value);
        this.setUnsaved(true);
      },
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
      setStatus: 'post/create/setStatus',
      setUnsaved: 'post/create/setUnsaved',
    }),

    ...mapActions({}),
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
@import './styles/post-status-field.css';
</style>
