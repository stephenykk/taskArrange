<template>
  <div class="ui-select">
    <el-select v-model="selected" @change="handleChange" placeholder="请选择">
      <el-option v-for="item in list" :key="item[valueKey]" :label="item[labelKey]" :value="item[valueKey]"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'UiSelect',
    props: {
      value: null,
      api: String,
      fields: {
        type: Array,
        default() {
          return ['id', 'name'];
        }
      }
    },
    data() {
      return {
        list: [],
        selected: ''
      };
    },
    computed: {
      labelKey() {
        return this.fields[1];
      },
      valueKey() {
        return this.fields[0];
      }
    },
    methods: {
      handleChange(...args) {
        this.$emit('change', ...args);
      }
    },
    watch: {
      value() {
        this.selected = this.value;
      }
    },
    created() {
      this.selected = this.value;

      const fields = this.fields;

      const onGetlist = (res) => {
        this.list = res.data;
      };

      axios.post(P.getApi(this.api), {fields})
           .then(P.resolvedCallback('', onGetlist));

    }
  };
</script>