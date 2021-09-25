<template>
  <div :class="managePostListItemClasses">
    <ManagePostListItemMedia
      :item="item"
      @click="onClickPostListItemMedia($event, item)"
    />
    <ManagePostListItemContent :item="item" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ManagePostListItemMedia from '@/manage/post/components/manage-post-list-item-media.vue';
import ManagePostListItemContent from '@/manage/post/components/manage-post-list-item-content.vue';

export default defineComponent({
  name: 'ManagePostListItem',

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
    return {};
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      isSelected: 'manage/select/isSelected',
    }),

    managePostListItemClasses() {
      return [
        'manage-post-list-item',
        { selected: this.isSelected(this.item.id) },
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
    ...mapMutations({}),

    ...mapActions({
      manageSelectedItems: 'manage/select/manageSelectedItems',
    }),

    onClickPostListItemMedia(event, post) {
      let actionType;

      if (event.metaKey || event.ctrlKey) {
        actionType = 'add';
      }

      if (this.isSelected(post.id)) {
        actionType = 'remove';
      }

      this.manageSelectedItems({
        resourceType: 'post',
        item: post.id,
        actionType,
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    ManagePostListItemContent,
    ManagePostListItemMedia,
  },
});
</script>

<style scoped>
@import './styles/manage-post-list-item.css';
</style>
