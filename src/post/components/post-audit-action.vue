<template>
  <div :class="postAuditActionClasses">
    <div class="icon">
      <CircleButton :icon="icon" @click="onClickButton" :disabled="disabled" />
    </div>
    <div class="text">
      <button class="button basic" @click="onClickButton">{{ text }}</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import CircleButton from '@/app/components/circle-button.vue';

export default defineComponent({
  name: 'PostAuditAction',

  /**
   * 属性
   */
  props: {
    post: {
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
   * 事件
   */
  emits: ['change'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      audit: 'post/create/audit',
    }),

    icon() {
      const { icon } = this.getAuditAction(this.post);

      return icon;
    },

    text() {
      const { text } = this.getAuditAction(this.post);

      return text;
    },

    action() {
      const { action } = this.getAuditAction(this.post);

      return action;
    },

    disabled() {
      return !this.action;
    },

    postAuditActionClasses() {
      return [
        'post-audit-action',
        { approved: this.audit.status === 'approved' },
        { denied: this.audit.status === 'denied' },
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
      revokeAudit: 'audit/revoke/revokeAudit',
      pushMessage: 'notification/pushMessage',
    }),

    getAuditAction({ audit }) {
      let icon, text, action;

      const status = audit && audit.status ? audit.status : null;

      switch (status) {
        case 'pending':
          icon = 'pending';
          text = '审核中';
          action = 'revoke';
          break;
        case 'denied':
          icon = 'error_outline';
          text = '审核被拒';
          action = 'create';
          break;
        case 'approved':
          icon = 'check_circle';
          text = '审核通过';
          action = 'revoke';
          break;
        default:
          icon = 'add_task';
          text = '提交审核';
          action = 'create';
          break;
      }

      return { icon, text, action };
    },

    onClickButton() {
      // 根据action值来判断进行动作
      switch (this.action) {
        case 'create':
          this.submitCreateAudit();
          break;
        case 'revoke':
          this.submitRevokeAudit();
          break;
      }
    },

    async submitCreateAudit() {
      const { id: resourceId } = this.post;
      const status = 'pending';

      try {
        await this.createAudit({
          data: {
            resourceId,
            resourceType: 'post',
            status,
          },
        });

        this.pushMessage({ content: '提交审核成功，请等待审核' });

        this.$emit('change', { status });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async submitRevokeAudit() {
      const { id: resourceId } = this.post;

      try {
        await this.revokeAudit({
          data: {
            resourceId,
            resourceType: 'post',
          },
        });

        this.pushMessage({ content: '成功取消审核' });

        this.$emit('change', null);
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
@import './styles/post-audit-action.css';
</style>
