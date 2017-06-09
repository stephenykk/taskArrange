<template>
  <div class="clock">
    <ul class="clock-inner">
      <li class="date"><i>{{y}}</i>-<i>{{m}}</i>-<i>{{d}}</i></li>
      <li class="time"><i>{{h}}</i>:<i>{{i}}</i>:<i>{{s}}</i></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Clock',
    props: ['date'],
    data() {
      return {
        now: new Date(),
        timer: null
      };
    },
    computed: {
      y() {
        return this.now.getFullYear();
      },
      m() {
        return P.d2(this.now.getMonth() + 1);
      },
      d() {
        return P.d2(this.now.getDate());
      },
      h() {
        return P.d2(this.now.getHours());
      },
      i() {
        return P.d2(this.now.getMinutes());
      },
      s() {
        return P.d2(this.now.getSeconds());
      }
    },
    methods: {
      clockStart() {
        P.log(this.date);
        this.now = this.date;
        const run = () => {
          this.now = new Date(this.now.getTime() + 1000);
          this.timer = setTimeout(run, 1000);
        };
        run();
      },
      clockStop() {
        clearTimeout(this.timer);
      }
    },
    created() {
      this.clockStart();
    }
  };
</script>

<style lang="scss">
  .clock {
    text-align: center;
    .clock-inner {
      margin: 30px auto 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 400px;
      font-size: 30px;
      font-weight: normal;
      color: #000;
      li {
        flex: 1;
        list-style: none;
        i {
          display: inline-block;
          padding: 10px 5px;
          background: #000;
          color: #eee;
          border-radius: 5px;
          font-style: normal;
        }
      }
    }
  }
</style>
