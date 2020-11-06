import { reactive,computed,ref } from 'vue';

function useTodoList() {

    let id = 3;

    let todos = reactive([
        { id: 1, title: "todo1",completed:false },
        { id: 2, title: "todo2",completed:true },
    ])
    let allDone = computed({
        get(){
            return todos.every(todo=>todo.completed)
        },
        set(val){
            todos.forEach(todo=>todo.completed=val)
        }
    })

    let visibility = ref("all")
    let filterTodos = computed(()=>{
        let state = visibility.value;
        if(state === 'all'){
            return todos
        }else if(state === 'active'){
            return todos.filter(todo=>!todo.completed)
        }else if(state === 'completed'){
            return todos.filter(todo=>todo.completed)
        }
    })
    let changeState = function(state){
        visibility.value = state;
    }

    let removeTodo = function(todo){
        let index = todos.indexOf(todo)
        todos.splice(index,1)
    }
    

    let data = reactive({
        todos,
        visibility,
        newTodo: "", //用来收集新的数据
        addNewTodo(){
            //防止添加空任务
            if (data.newTodo) {
                data.todos.unshift({
                    id: id++,
                    title: data.newTodo,
                    completed:false
                });
                data.newTodo = "";
            }
        },
        allDone,
        changeState,
        filterTodos,
        removeTodo
    });

    //CompositionAPI
    return data;
}

export default useTodoList;