<template>
    <div class="pagination">
        <a v-for="p of pages" :key="p" :class="{active:p === page}">
            {{p}}
        </a>
    </div>
</template>

<script>
import usePagination from '@/use/pagination'
import {toRef} from 'vue';
export default {
    name:'Pagination',
    props:{
        total:{
            type:Number,
            default:0
        },
        page:{
            type:Number,
            default:1
        }
    },
    // computed: {
    //     pages(){
    //         return Math.ceil(this.total/4)
    //     }
    // },
    setup(props){
        //props参数
        let pages = usePagination(props);

        return {
            pages,
            page:toRef(props.page)
        }
    }
}
</script>