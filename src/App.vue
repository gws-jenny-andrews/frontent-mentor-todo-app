<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import draggable from 'vuedraggable'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

interface IListItem {
  description: string,
  order: number
}

// const message = [
//   "vue.draggable",
//   "draggable",
//   "component",
//   "for",
//   "vue.js 2.0",
//   "based",
//   "on",
//   "Sortablejs"
// ];
//let order = message.length;

const fetchTodoList = async () => {
  const response = await axios.get("api/todos")
  return response.data
}

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})

const list = ref<IListItem[]>([])
const isDragging = ref<boolean>(false)

watch(data, async (data) => {
  list.value = data
}, {immediate:true})


const sort = () => {
  list.value = list.value.sort((a, b) => a.order - b.order);
}

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  }
})

const updateList = () => {
  isDragging.value = false
  list.value = list.value.map((item: IListItem, index: number) => {
    return { description: item.description, order: index };
  })
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-2">
        <button class="btn btn-secondary button" @click="sort">
          To original order
        </button>
      </div>

      <div class="col-6">
        <h3>Transition</h3>
        <draggable class="list-group" item-key="order" tag="ul"
          :component-data="{ name: 'flip-list', type: 'transition' }" v-model="list" v-bind="dragOptions"
          @start="isDragging = true" @end="updateList">
          <template #item="{ element }">
            <li class="list-group-item">
              {{ element.description }}
            </li>
          </template>
        </draggable>
      </div>


    </div>
  </div>
  <div style="color:#fff" v-for="d in data">
    {{ d.name }}
  </div>
</template>

<style scoped>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}

.list-group {
  min-height: 20px;
}


.list-group-item:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .125);
}

.list-group-item {
  cursor: pointer;
}

.list-group-item i {
  cursor: pointer;
}
</style>
