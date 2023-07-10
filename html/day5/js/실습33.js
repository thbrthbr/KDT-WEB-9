

let cat = {
    age: 5,
    mbti: "ISTP",
    name: "이태희",
    introduce: function(){
        console.log("안녕하세요");
    }
}

console.log(cat);
console.log(cat.name);
console.log(cat.mbti);
cat.introduce();

// let score1 = prompt("첫번째 성적을 입력하세요");
// let score2 = prompt("두번째 성적을 입력하세요");

// console.log(score1, score2);

let test = String(null);
console.log(typeof test);