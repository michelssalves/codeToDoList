<template>
  <!--quando clicado na div muda a cor da caixa de texto-->
  <div
    @click="$emit('taskStateChanged', task)"
    class="task"
    :class="stateClass"
  >
    <!--quando clicado no x ele emite esse evento para excluir a tarefa e stop nao deixa afetar o taskStateChanged-->
    <span @click.stop="$emit('taskDeleted', task)" class="close">x</span>
    <p>{{ task.name }}</p>
  </div>
</template>
<script>
export default {
  props: {
    task: { type: Object, required: true },
  },
  
  computed: {
    //avalia qual classe sera utilizada no componente vermelha ou verde
    stateClass() {
      return {
        pending: this.task.pending,
        done: !this.task.pending,
      };
    },
  },
};
</script>

<style scoped>
.task {
  position: relative;
  box-sizing: border-box;
  width: 350px;
  height: 150px;
  padding: 10px;
  border-radius: 8px;
  font-size: 2rem;
  font-weight: 300;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pending {
  border-left: 12px solid #b73229;
  background-color: #f44336;
}
.done {
  color: #ddd;
  border-left: 12px solid #0a8f08;
  background-color: #4caf50;
  text-decoration: line-through;
}
.pending .close {
  background-color: #b73229;
}
.done .close {
  background-color: #0a8f08;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
</style>