var arrList = new Array(1,2,3,4,5,6,7,8,9);

arrList.forEach(item=>{
    console.log(item);
});

for(var i = arrList.length;i;i--){
    console.log(arrList[i]);
}

for(var i in arrList){
    console.log(arrList[i]);
}