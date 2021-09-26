<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="thumbnail">
      <img class="image" :src="item.file.size.medium" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

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
    return {};
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
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list-item.css';
</style>
