var a; //Declaration
a = 10; //initialization
var a = 10;
console.log(a);
let b;
b=30;
b=20
console.log(b);
const c =40;
console.log(a+b+c)
var num = 10;
var str = "siva";
var bool = true;
var undef;
var nll = null;
var symbol = Symbol;
var bigInt = 5465466n;
var arr = [6,5,2,5,6]
var obj = {
    name: "sivaranjani"
}
console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);
console.log(typeof undef);
console.log(typeof nll);
console.log(typeof symbol);
console.log(typeof bigInt);
console.log(typeof arr);
console.log(typeof obj);

 


// conditional operator
var x = 1;
var y ="1";
console.log(x > y);
console.log(x >= y);
console.log(x < y);
console.log(x <= y);
console.log(x == y); 
console.log(x != y);
console.log(x === y);

//logical operator(&&, ||,!)


console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);

console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false); 


console.log(!true);
console.log(!false);

// Assignment operator 
var x = 10;
var y = 40;
console.log(x);
x -= y;
console.log(x)

var x = 10;
var y = 40;
console.log(x);
x += y;
console.log(x)

//conditional statement

// if(condition){
//  //statement
//}
var x = 10;
if(x%2===0);{
    console.log ("even")
}
// if(condition){
//  //statement
//}else{
    //statement
    //}

    if(x%2===0){
    console.log ("even")
    }
    else{
        console.log("odd")
    }
    var mark = 90;

    if(mark>=80){
        console.log("a grade");
    }
   else if(mark>=60){
        console.log("b grade");
    }
    else if(mark>=50){
        console.log("c grade");
    }
  
   else if(mark>=35){
        console.log("pass");
    }
    //terinary operator
    var x = 2;
    //condition ? true statement : false statement
    var result = x%2===0 ? "even" : "odd";
    console.log(result)
   var mark=50;
   var grade =  mark>=90 ? "o grade" :
                mark>=80 ? "A+ grade" :
                mark>=70 ? "A grade" :
                mark>=60 ? "b+ grade" :
                mark>=50 ? "c grade" :
                mark>=35 ? "pass" : "fail" ;

                console.log(grade);
                var day =8;
                switch(day){
                    case 1:{
                        console.log("sunday");
                        break;
                    }
                    case 2:{
                        console.log("monday");
                        break
                    }
                    case 3:{
                        console.log("tuesday");
                        break
                    }
                    case 4:{
                        console.log("wednesday");
                        break
                    }
                    case 5:{
                        console.log("thursday");
                        break
                    }
                    case 6:{
                        console.log("friday");
                        break
                    }
                    case 7:{
                        console.log("saturday");
                        break
                    }
                    
                    default:{
                        console.log("invalid input");
                    }
                }

                // for (initialization; condition; increment/decrement)
                  //statement
                // }

                for (let i=1;i<=10;i++){
                    console.log(i);
                }

                //while(condition){
                // statement
                //}

                var num = 1026;
                var digit = 0;
                while(num>0){
                    digit++;
                    num =Math.floor(num/10);
                }
                console.log(digit

                )

                //unary operator
                var x = 1;

                console.log(x++);
                console.log(++x);
                var x = 1;

                console.log(x--);
                console.log(--x);

                
                //do{
                //    // statement
                //}while(condition);

                do{
                    console.log("do...while");
                }while(false);

                while(false){
                    console.log("while example")
                }
                for(let i=1;i<=10;i++){
                    // if(i>5){
                    //  break;
                    //}
                    if(1==5)
                        continue;
                    }
                    console.log(i);
                }

                function add(){
                    console.log(10+20);
                }
                add();
                add();
                add();
                function add(a=10, b=15){
                    console.log(a+b)
                }
                add(10,20);
                add(15,25);
                add(20);
                add();

                var add = () =>{
                    console.log(10+20);

                }
                add();

                var sum = () => {
                    console.log("arrow function");
                }
                sum();

                var arr = [1,2,3,4,5];
                var square = arr.map((val)=>(val**2))
                console.log(square)
                var even = arr.filter((val)=>(val%2===0));
                console.log(even);
                var sum = Arr                                                                                                                                                                                                                                                                    .reduce((total,curr)=>(total+val),0);
                console.log(sum);



                

                
                


                 
               


   
    
    

 

