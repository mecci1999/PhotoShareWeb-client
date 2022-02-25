<template>
  <div class="order-date-time-range-filter">
    <CheckboxField
      class="compact"
      :useIcon="false"
      v-for="{ text, value } in fields"
      :key="text"
      :value="value.join('|')"
      :text="text"
      :name="name"
      type="radio"
      v-model="_dateTimeRange"
    ></CheckboxField>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CheckboxField from '@/app/components/checkbox-field.vue';
import { getDateTimeRange } from '@/app/app.service';

export default defineComponent({
  name: 'OrderDateTimeRangeFilter',

  /**
   * 属性
   */
  props: {
    name: {
      type: String,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      fields: [],
    };
  },

  /**
   * 监视
   */
  watch: {
    dateTimeRange(value) {
      const query = { ...this.$route.query };

      if (value) {
        query.created = value;
      } else {
        delete query.created;
      }

      this.$router.replace({ query });
    },
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      dateTimeRange: 'order/index/dateTimeRange',
    }),

    _dateTimeRange: {
      get() {
        return this.dateTimeRange;
      },

      set(value) {
        this.setDateTimeRange(value);
      },
    },
  },

  /**
   * 已创建
   */
  created() {
    // 组件初始化，得到日期范围数据
    this.fields = getDateTimeRange();

    const {
      query: { created },
    } = this.$route;

    // 判断
    if (created) {
      this.setDateTimeRange(created);
    } else {
      this.setDateTimeRange('');
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setDateTimeRange: 'order/index/setDateTimeRange',
    }),

    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    CheckboxField,
  },
});
</script>

<style scoped>
@import './styles/order-date-time-range-filter.css';
</style>
