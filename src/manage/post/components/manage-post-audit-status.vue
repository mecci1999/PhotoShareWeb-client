<template>
  <div class="manage-post-audit-status">
    <CircleButton
      v-for="{ status, icon, active } in actions"
      :key="status"
      :icon="icon"
      :active="active"
      :disabled="active"
      @click="onClickActionButton(status)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import CircleButton from '@/app/components/circle-button.vue';

export default defineComponent({
  name: 'ManagePostAuditStatus',

  /**
   * 属性
   */
  props: {
    post: {
      type: Object,
    },
  },

  /**
   * 事件
   */
  emits: ['change'],

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
    actions() {
      const isActive = status => {
        return this.post.audit && this.post.audit.status === status;
      };

      return [
        {
          status: 'pending',
          icon: 'pending',
          active: isActive('pending'),
        },
        {
          status: 'denied',
          icon: 'error_outline',
          active: isActive('denied'),
        },
        {
          status: 'approved',
          icon: 'check_circle',
          active: isActive('approved'),
        },
      ];
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
    ...mapActions({
      createAudit: 'audit/create/createAudit',
      pushMessage: 'notification/pushMessage',
    }),

    async onClickActionButton(status) {
      const { id: resourceId } = this.post;

      try {
        await this.createAudit({
          data: {
            resourceId,
            resourceType: 'post',
            status,
          },
        });

        if (status) {
          if (status === 'approved')
            this.pushMessage({ content: '已通过该内容的审核' });
          if (status === 'denied')
            this.pushMessage({ content: '已拒绝该内容的审核' });
          if (status === 'pending')
            this.pushMessage({ content: '该内容的审核正在审核中' });
        }

        this.$emit('change', { status });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    CircleButton,
  },
});
</script>

<style scoped>
@import './styles/manage-post-audit-status.css';
</style>
