<template>
      <div class="masterOpen">
        <input placeholder="请输入" class="bindInput" ref="wbind" v-model="wbind"/>
      </div>
</template>

<script>
export default {
  name: "cmdOpen",
  data(){
    return {
      wbind:'',
    }
  },
  created() {
    this.$nextTick(()=> {
      this.$refs.wbind.focus;
    })
  }
}
</script>

<style scoped>
.masterOpen{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 99;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.bindInput{
  border-radius: 5px;
  width: 50%;
  height: 5%;
  font-weight: 600;
  padding: 0px 10px;
  transition: 1s;
}
.bindInput:focus{
  outline: 0;
  animation: -input 10s linear infinite alternate;
}
@keyframes -input {
  0%{
    border: 1px solid #f95d5d;
    box-shadow: 0px 0px 10px 0px #f95d5d;
  }
  25%{
    border: 1px solid #b76b6b;
    box-shadow: 0px 0px 10px 0px #5f3333;
  }
  45%{
    border: 1px solid #9cf3eb;
    box-shadow: 0px 0px 10px 0px #72debc;
  }
  65%{
    border: 1px solid #3885d7;
    box-shadow: 0px 0px 10px 0px #291cdb;
  }
  85%{
    border: 1px solid #d72df5;
    box-shadow: 0px 0px 10px 0px #e286fc;
  }
  100%{
    border: 1px solid #f1bb79;
    box-shadow: 0px 0px 10px 0px #c2eea3;
  }
}
</style>
