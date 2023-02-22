
<template>
  <div class="task-grid">
    <template v-if="tasks.length">
      <!-- um for que percorre o obejto tasks gerando divs que representam a tarefa 
      todas vez que roda o for é passado o valor por parametro para o objeto :task=task-->
      <Task
        v-for="(task, i) in tasks" :key="task.name"
        @taskDeleted="$emit('taskDeleted', i)"
        @taskStateChanged="$emit('taskStateChanged', i)"
        :task="task"
      ></Task>
    </template>
    <p v-else class="no-task">Sua vida está em dia =]</p>
  </div>
</template>
<script>
import Task from "./TaskComp.vue";

export default {
  components: { Task },
  props: {
    tasks: { type: Array, required: true },
  },
};
</script>
<style scoped>
.task-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.task-grid .task {
  margin: 10px;
}
.no-task {
  color: #aaa;
  font-size: 1.7rem;
}
</style>

