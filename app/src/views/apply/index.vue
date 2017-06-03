<template>
  <div class="apply-page">
    <h1 class="text-center">故障服务申请</h1>
    <apply-form :edit-api="`apply/update/${curApply.id}`" :current="curApply"></apply-form>
  </div>
</template>

<script>
  import ApplyForm from './ApplyForm';
  import data from './data';

  const {newApply} = data;

  export default {
    name: 'ApplyPage',
    data() {
      return {
        curApply: Object.assign({}, newApply)
      };
    },
    methods: {
      getApply() {
        const {name, params} = this.$route;
        if (name === 'applyEdit' && params.id) {
          axios.post(P.getApi('apply/get'), {id: params.id})
               .then(P.resolvedCallback('获取申请', res => {
                 this.curApply = res.data[0];
               }));
        }
      }
    },
    components: {
      ApplyForm
    },
    watch: {
      $route: 'getApply'
    },
    created() {
      P.checkLogin(this);
      
      this.getApply();
    }
  };
</script>

<style lang="scss">
  .apply-page {
    h1 {
      font-size: 23px;
      font-weight: normal;
    }
  }
</style>