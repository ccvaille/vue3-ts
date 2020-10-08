### 性能

- 打包大小减少 41%
- 初次渲染快 55%，更新快 133%
- 内存使用减少 54%

### Composition API

- ref 和 reactive
- computed 和 watch
- 新的生命周期函数
- 自定义函数 - Hooks 函数

### 新增特性

- Teleport - 瞬移组件的位置
- Suspense - 异步加载组件的新福音
- 全局 API 的修改和优化
- 更好的 TS 支持

### 为什么出现 Vue3

- 随着功能的增长，复杂组件的代码变得难以维护
  - 可以把代码根据逻辑分类
    - 例如搜索、分页功能不用写在各个地方
- Mixin 的缺点
  - 命名冲突
  - 不清楚暴露出来变量的作用
  - 复用到其他 component 经常会遇到问题
- 对 ts 支持有限

### 新 API

- setup(props, context){}
- reactive({})
- ref
- toRefs()
- computed(()=> {})

### defineProperty 和 proxy

```js
Object.defineProperty(data, "count", {
  get() {},
  set() {},
});
new Proxy(data, {
  get(key) {},
  set(key, value) {},
});
```

### 声明周期更新

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- activated -> onActivated
- deacticated -> onDeactivated
- errorCaptured -> onErrorCaptured

add

- onRenderTracked
- onRenderTriggered

### 模块化

- 单独抽离到 hooks 文件夹

```ts
import { ref } from "vue";
import axios from "axios";

function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  result.value;
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);

  axios
    .get(url)
    .then((rawData) => {
      loading.value = false;
      loaded.value = true;
      result.value = rawData.data;
    })
    .catch((e) => {
      error.value = e;
      loading.value = false;
    });

  return {
    result,
    loaded,
    loading,
    error,
  };
}

export default useURLLoader;
```

### defineComponent

```ts
import { defineComponent } from "vue";
export default defineComponent({
  name: "Modal",
  props: {
    isOpen: Boolean,
  },
  emits: {
    // 需要校验
    "close-modal": (payload) => {
      return payload.type === "close";
    },
    // 不需要校验
    test: null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal", {
        type: "close",
      });
      context.emit("test");
    };
    return {
      buttonClick,
    };
  },
});
```

### teleport 让组件可以传送到任何节点

- 在 html 里面添加一个 id 为 modal 的元素

```html
<teleport to="#modal">
  <div id="center">
    <h2>this is a modal</h2>
  </div>
</teleport>
```

### suspense 异步函数

```html
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
```

### onErrorCaptured suspense 捕获错误

```ts
const error = ref(null);
onErrorCaptured((e: any) => {
  error.value = e;
  // 一定要返回 true 才会向上传播
  return true;
});
```

### 全局 API 修改

- Vue.config 改成 app.config
  - config.productionTip 被删除
  - config.ignoredElements 改名为 config.isCustomElement
  - config.keyCodes 被删除
- 全局注册类 API
  - Vue.component -> app.component
  - Vue.directive -> app.directive
- 全局扩展类 API
  - Vue.mixin -> app.mixin
  - Vue.use -> app.use

```ts
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

app.use();
app.mixin();
app.component();
app.directive();
app.mount("#app");
```
