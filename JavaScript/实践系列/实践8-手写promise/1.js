function UTF8_Encoding(str){
    const coder = new TextEncoder();
    let s = coder.encode(str);
    console.log(s);
}

let a = void 0;