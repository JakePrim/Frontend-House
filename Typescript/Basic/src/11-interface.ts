/* 接口 可以约定一个对象的结构*/
export {};

//可以约定有哪些成员 TS 只是进行了约束 在编译成JavaScript时实际上没有任何意义和普通对象一样
interface Post {
  title: string;
  content: string;
  //可选成员
  subtitle?: string;
  //只读成员
  readonly summary:string;
}

// function printPost(post:Post){
//     console.log(post.title);
//     console.log(post.content);
// }

// printPost({title:'hello',content:'a javascript'});

const hello: Post = {
  title: "hello",
  content: "a javascript",
  summary:'A JavaScript'
};

// hello.summary = "123";

//动态成员
//定义动态成员的key类型 以及值的类型 定义的成员必须一致否则会报错
interface Cache{
    [prop:string]:string //[prop:string] -> key的类型 :string -> 值的类型
}

const cache:Cache = {}
cache.foo = "value";
// cache.bar = 123;
/* interface 接口 约定一个对象当中有哪些成员 */


// export{}

// //定义接口约束对象成员
// interface Post {
//   title:string;
//   content:string
// }

// function printPost (post:Post){
//   console.log(post.title);
//   console.log(post.content);
// }

// printPost({title:'title',content:'content'});