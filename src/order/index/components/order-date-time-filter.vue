<template>
  <div class="order-date-time-filter">
    <div class="header">日期</div>
    <div class="content">
      <OrderDateTimeRangeFilter name="order-index-side-sheet-date-time-range" />
      <TextField placeholder="开始日期" v-model="dateTimeStart" />
      <TextField placeholder="结束日期" v-model="dateTimeEnd" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import TextField from '@/app/components/text-field';
import OrderDateTimeRangeFilter from '@/order/index/components/order-date-time-range-filter';

export default defineComponent({
  name: 'OrderDateTimeFilter',

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
      dateTimeRange: 'order/index/dateTimeRange',
    }),

    dateTimeStart: {
      get() {
        return this.dateTimeRange.split('|')[0];
      },

      set(value) {
        this.setDateTimeRange(`${value}|${this.dateTimeEnd}`);
      },
    },

    dateTimeEnd: {
      get() {
        return this.dateTimeRange.split('|')[1];
      },

      set(value) {
        this.setDateTimeRange(`${this.dateTimeStart}|${value}`);
      },
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
    ...mapMutations({
      setDateTimeRange: 'order/index/setDateTimeRange',
    }),

    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    OrderDateTimeRangeFilter,
  },
});
</script>

<style scoped>
@import './styles/order-date-time-filter.css';
</style>
