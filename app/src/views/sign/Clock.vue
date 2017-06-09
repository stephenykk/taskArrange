<template>
  <div class="clock">
    <ul class="clock-inner">
      <li class="date"><i>{{y}}</i>-<i>{{m}}</i>-<i>{{d}}</i></li>
      <li class="time"><i>{{h}}</i>:<i>{{i}}</i>:<i>{{s}}</i></li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'Clock',
    // props: ['date'],
    data() {
      return {
        now: new Date(),
        timer: null
      };
    },
    computed: {
      ...mapState(['servertime']),
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
      ...mapMutations(['setServertime']),
      clockStart() {
        P.log(this.servertime);
        this.now = this.servertime;
        const run = () => {
          this.now = new Date(this.now.getTime() + 1000);
          this.timer = setTimeout(run, 1000);
        };
        run();
      },
      clockStop() {
        clearTimeout(this.timer);
      },
      getServerTime(cb) {
        axios.get(P.getApi('home/time'))
          .then(P.resolvedCallback('', res => {
            this.setServertime(res.data.servertime);
            cb && setTimeout(cb, 1000);
          }));
      }
    },
    created() {
      this.getServerTime(() => {
        this.clockStart();
      });

    }
  };
</script>

<style lang="scss">
  .clock {
    text-align: center;
    .clock-inner {
      margin: 30px auto;
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
