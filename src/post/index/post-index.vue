<template>
  <PostList />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import PostList from './components/post-list';

export default defineComponent({
  title() {
    return `${this.isMostCommentsQueryString}内容列表`;
  },

  computed: {
    ...mapGetters({
      isMostCommentsQueryString: 'post/index/isMostCommentsQueryString',
    }),
  },

  components: {
    PostList,
  },
});
</script>
