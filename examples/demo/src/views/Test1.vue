<template>
  <div class="home">
    {{$ns('test1').test1}}
  </div>
</template>

<script>
// @ is an alias to /src
import test1 from '../mixins/test'
export default {
  name: "Test1",
  mixins: [test1]
};
</script>
