<template>
  <div class="task-searchbar mt20">
    <el-form inline label-width="60px" label-suffix=": ">
      <el-form-item label="关键字">
        <el-input v-model="searching.kw" placeholder="任务名 / 任务内容" @keyup.native.enter="search"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searching.frequency">
            <el-option label="全部" value=""></el-option>
            <el-option :key="type.value" v-for="type in taskTypes" :label="type.label" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searching.status">
            <el-option label="全部" value=""></el-option>
            <el-option :key="status" v-for="(label, status) in statusMap" :label="label" :value="status"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button icon="search" type="primary" @click="search">查询</el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	import data from './data';

	const defSearching = {
		kw: '',
		frequency: '',
		status: ''        
	};

	const {statusMap, taskTypes} = data;

	export default {
		name: 'TaskSearchbar',
		data() {
			return {
				searching: Object.assign({}, defSearching),
				statusMap,
				taskTypes
			};
		},
		methods: {
			search() {
				let data = P.filterKey(this.searching, v => !!v);
				this.$emit('search', data);
			},
			reset() {
				this.searching = Object.assign({}, defSearching);
				this.$emit('reset', {});
			}
		}
	};
</script>

<style>
	.task-searchbar {
        .el-select {
            width: 180px;
        }
	}
</style>