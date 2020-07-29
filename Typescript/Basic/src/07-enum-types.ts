/* 枚举类型 */

export{}

//枚举类型 名字 固定值 
// const PostStatus={
//     Draft:0,
//     Unpublished:1,
//     Published:2
// }
//默认值是：0开始 依次累加 可以不用指定值
//枚举值可以是字符串 但是字符串无法像数字一样自增长 需要给每一个枚举赋值
//常量枚举 以及 基本枚举的编译情况是不同的 注意
const enum PostStatus{
    Draft,
    Unpublished,
    Published
}

const post={
    title:"Hello TypeScript",
    content:"",
    status:PostStatus.Draft//0 1
}

// PostStatus[0]// => Draft