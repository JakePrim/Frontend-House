/* 接口 可以约定一个对象的结构*/
export {};

//可以约定有哪些成员 在编译成JavaScript时实际上没有任何意义和普通对象一样
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
    [prop:string]:string
}

const cache:Cache = {}
cache.foo = "value";
// cache.bar = 123;