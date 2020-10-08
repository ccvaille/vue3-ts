<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>{{ count }}</p>
    <p>{{ double }}</p>
    <p>{{ greetings }}</p>
    <p>x: {{ x }}, y: {{ y }}</p>
    <p><button @click="openModal">openModal</button></p>
    <p><button @click="increase">+1</button></p>
    <p><button @click="updateGreeting">updateGreeting</button></p>
    <hr />
    <template v-if="loading"> loading </template>
    <template v-if="loaded">
      <img :src="result[0].url" width="100" />
    </template>
    <Modal :isOpen="modelIsOpen" @close-modal="onModelClose">
      了啦啦啦拉拉</Modal
    >
    <p v-if="error && error !== null">Suspense error: {{ error }}</p>
    <Suspense>
      <template #default>
        <!-- 组件必须返回 Promise -->
        <!-- 多个组件会全部返回才会显示 -->
        <div>
          <AsyncShow></AsyncShow>
          <AsyncDogShow></AsyncDogShow>
        </div>
      </template>
      <template #fallback> <p>loading...</p> </template>
    </Suspense>
  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
  onUpdated,
  onRenderTracked,
  onErrorCaptured,
} from "vue";
// import useMousePosition from "./hooks/useMousePositionByRef";
import useMousePosition from "./hooks/useMousePositionByReactive";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import AsyncDogShow from "./components/AsyncDogShow.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
// import HelloWorld from './components/HelloWorld.vue';
export default defineComponent({
  name: "App",
  components: {
    Modal,
    AsyncShow,
    AsyncDogShow,
  },
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value*2
    // })
    // const increase = () => {
    //   count.value++
    // }
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      // 一定要返回 true 才会向上传播
      return true;
    });
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "hello...";
    };
    onMounted(() => {
      console.log("mounted");
    });
    onUnmounted(() => {
      console.log("unmounted");
    });
    onUpdated(() => {
      console.log("update");
    });
    onRenderTracked((event) => {
      console.log(event);
    });
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
    });
    const { x, y } = useMousePosition();
    // useURLLoader<DogResult>(
    //   "https://dog.ceo/api/breeds/image/random"
    // );
    const { result, loaded, loading } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log(result.value[0].url, "message");
      }
    });
    const refData = toRefs(data);
    watch([greetings, () => data.count], (n, old) => {
      console.log(n, old);
      document.title = `update ${greetings.value}-${data.count}`;
    });
    const modelIsOpen = ref(false);
    const openModal = () => {
      modelIsOpen.value = true;
    };
    const onModelClose = () => {
      modelIsOpen.value = false;
    };
    return {
      //   count,
      //   increase,double
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loaded,
      loading,
      modelIsOpen,
      openModal,
      onModelClose,
      error,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
