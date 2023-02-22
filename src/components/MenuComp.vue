<template>
    <div id="app">
      <h1>Tarefas</h1>
        <TaskProgress :progress="progress" />
        <NewTask @taskAdded="addTask" />
    <TaskGrid
         @taskDeleted="deleteTask"
        @taskStateChanged="toggleTaskState"
        :tasks="tasks"
      /> 
    </div>
  </template>
  <script>
  //aqui e importado os componentes
  import TaskProgress from "./TaskProgressComp.vue";
  import NewTask from "./NewTaskComp.vue";
  import TaskGrid from "./TaskGridComp.vue";
  export default {
   // components: { TaskProgress, TaskGrid, NewTask },
    components: { TaskProgress, NewTask, TaskGrid },
    data() {
      return {
        tasks: [],
      };
    },
    //propriedade calculada
    computed: {
      progress() {
        // this.task.length  = quantidade total de tarefas dentro do array tasks
        const total = this.tasks.length;
        // quantidade de tarefas concluidas sendo filtradas no array atravá da condiçao nao pendente
        const done = this.tasks.filter((t) => !t.pending).length;
        // retorna o percentual e caso a conta seja NAN retorna por padrao 0
        return Math.round((done / total) * 100) || 0;
      },
    },
    watch: {
      //transformando o task de funçao para objeto
      tasks: {
        // vai monitorar por completo o array(profundo)
        deep: true,
        handler() {
          //pegando a lista de tasks e convertendo pra uma string e setando localstorage  apartir da chave tasks
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
        },
      },
    },
    methods: {
      addTask(task) {
        //verifica se as tasks tem o mesmo nome
        const sameName = (t) => t.name === task.name;
        //aplica um filtro para nao inserir duplicado rever
        const reallyNew = this.tasks.filter(sameName).length == 0;
        if (reallyNew && this.name != undefined) {
          console.log(this.name)
          this.tasks.push({
            name: task.name,
            pending: task.pending || true,
          });
        }
      },
      deleteTask(i) {
        this.tasks.splice(i, 1);
      },
      toggleTaskState(i) {
        //esse metodo e chamado quando clicado na tarefa e com isso ela fica sempre o inverso do seu estado atual
        this.tasks[i].pending = !this.tasks[i].pending;
      },
    },
    //METODO DE CICLO DE VIDA
    created() {
      //const json em formato string recebem os valores setados no localstorage
      const json = localStorage.getItem("tasks");
      // json.parse tranforama em array a const json e assim popula nosso this.tasks para que mostre as tarefas
      const array = JSON.parse(json);
      //operardor ternario validando se estamos recebendo um array, caso contrario o this.tasks recebera um array vazio
      this.tasks = Array.isArray(array) ? array : [];
    },
  };
  </script>
  <style >
  body {
    font-family: "Lato", sans-serif;
    background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115));
    color: rgb(255, 255, 255);
  }
  #app {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  #app h1 {
    margin-bottom: 5px;
    font-weight: 300;
    font-size: 3rem;
  }
  </style>