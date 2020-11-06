
import {ref,reactive,toRefs,toRef,computed} from 'vue'

function usePagination(props){
    let pages = computed(()=>{
        return Math.ceil(props.total/4);
    });
    return pages
}

export default usePagination