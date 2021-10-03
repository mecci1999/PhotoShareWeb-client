<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="thumbnail">
      <img class="image" :src="image" v-if="image" />
      <ManagePostStatusAction :post="item"></ManagePostStatusAction>
    </div>
    <div class="actions">
      <button class="button basic circle" @click="onClickRemoveButton(item)">
        <AppIcon name="remove_circle_outline" color="#fff" size="16"></AppIcon>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';
import { getImageBase64 } from '@/file/file.service';
import ManagePostStatusAction from '@/manage/post/components/manage-post-status-action.vue';

export default defineComponent({
  name: 'ManagePostEditSelectedListItem',

  /**
   * 属性
   */
  props: {
    item: {
      type: Object,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      image: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({}),
  },

  /**
   * 已创建
   */
  async created() {
    this.image = await getImageBase64(this.item.file.size.medium);
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({
      manageSelectedItems: 'manage/select/manageSelectedItems',
    }),

    onClickRemoveButton(post) {
      this.manageSelectedItems({
        resourceType: 'post',
        item: post.id,
        actionType: 'remove',
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
    ManagePostStatusAction,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list-item.css';
</style>
