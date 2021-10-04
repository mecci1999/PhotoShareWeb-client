<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="thumbnail">
      <img class="image" :src="image" v-if="image" />
      <ManagePostStatusAction :post="item"></ManagePostStatusAction>
    </div>
    <div class="actions">
      <CircleButton
        icon="remove_circle_outline"
        @click="onClickRemoveButton(item)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { getImageBase64 } from '@/file/file.service';
import ManagePostStatusAction from '@/manage/post/components/manage-post-status-action.vue';
import CircleButton from '@/app/components/circle-button.vue';

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
    CircleButton,
    ManagePostStatusAction,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list-item.css';
</style>
