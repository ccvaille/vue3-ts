import { reactive, toRefs, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
    const data = reactive({
        x: 0,
        y: 0,
        updateMouse: (e: MouseEvent) => {
            data.x = e.pageX;
            data.y = e.pageY
            console.log(data.x, data.y)
        }
    })
    onMounted(() => {
        document.addEventListener('click', data.updateMouse)
    })
    onUnmounted(() => {
        document.removeEventListener('click', data.updateMouse)
    })

    return toRefs(data)
}

export default useMousePosition;