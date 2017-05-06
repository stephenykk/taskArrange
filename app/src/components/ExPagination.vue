<template>
  <el-pagination class="fr" :total="paging.total" :page-size="paging.pageSize" :page-sizes="paging.pageSizes" :layout="paging.layout" :current-page="paging.currentPage" @current-change="setCurrentPage" @size-change="setPageSize"></el-pagination>
</template>

<script>
export default {
  name: 'ExPagination',
  props: {
    paging: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      defPaging: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [5, 10, 20, 30],
        layout: 'sizes, prev, pager, next'
      }
    };
  },
  created() {
    P.defaults(this.paging, this.defPaging);
  },
  methods: {
    setCurrentPage(n) {
      this.paging.currentPage = n;
      this.$emit('paging-change', this.paging);
    },
    setPageSize(n) {
      this.paging.pageSize = n;
      this.$emit('paging-change', this.paging);
    }
  }
};
</script>
