/* 类型断言 */
export{}

const nums = [100,200,199,112];

const res = nums.find(i=>i>1000);//推断res可能找不到

// const square = res * res;
const num1 = res as number;//告诉编译器 我一定是number 不用担心

const num2 = <number>res;