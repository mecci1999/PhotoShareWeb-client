<template>
  <div class="manage-post-list-item-media">
    <img class="image" :src="image" v-if="image" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getImageBase64 } from '@/file/file.service';

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
  components: {},
});
</script>

<style scoped>
@import './styles/manage-post-list-item-media.css';
</style>
