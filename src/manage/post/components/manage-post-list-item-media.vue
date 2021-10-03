<template>
  <div class="manage-post-list-item-media">
    <img class="image" :src="image" v-if="image" />
    <ManagePostStatusAction />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getImageBase64 } from '@/file/file.service';
import ManagePostStatusAction from '@/manage/post/components/manage-post-status-action.vue';

export default defineComponent({
  name: 'ManagePostListItemMedia',

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
  computed: {},

  /**
   * 已创建
   */
  async created() {
    this.image = await getImageBase64(this.item.file.size.medium);
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {
    ManagePostStatusAction,
  },
});
</script>

<style scoped>
@import './styles/manage-post-list-item-media.css';
</style>
