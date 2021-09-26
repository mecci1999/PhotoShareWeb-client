<template>
  <div class="manage-post-edit-selected-list">
    <ManagePostEditSelectedListItem
      v-for="post in selectedPosts"
      :key="post.id"
      :item="post"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import ManagePostEditSelectedListItem from '@/manage/post/edit/components/manage-post-edit-selected-list-item.vue';

export default defineComponent({
  name: 'ManagePostEditSelectedList',

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

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      selectedPosts: 'manage/select/selectedPosts',
    }),
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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    ManagePostEditSelectedListItem,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list.css';
</style>
