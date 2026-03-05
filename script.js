const loadspeed=7

const bgimage=[
    // "image/ワンピース/luffy.png",
    // "image/ワンピース/zoro.png",
    // "image/ワンピース/sanji.png",
    // "image/ワンピース/sogeking.png",
    // "image/ワンピース/nami.png",
    // "image/ワンピース/chopper.png",
    // "image/ワンピース/robin.png",
    "image/year.png"
]
let bginterval
const bg=document.getElementById("bg")



// 数字スロットプログラム
function rollNum(container,from,to,second){
    //親要素、動かす要素（数字）、目的の数、秒数
 
    // それぞれ数字の桁数を取得
    let fromDigit = from.length
 
    // from(要素群)を数値に
    let fromNum = 0
    for(num of from){
        fromNum+=Number(num.textContent)*(10**(fromDigit-1))
        fromDigit--
    }
 
    if(fromNum == to)return
 
    currentYear = to // 年代更新
 
    const toDigit = String(to).length
 
    // toの数値を配列(toArray)に分解
    let toArray = []
    // toを複製
    let toNum = to
    for (let i=toDigit;i>0;i--){
        let divide = Math.floor(toNum/10)*10
        toArray[i-1]= toNum-divide
        toNum = Math.floor(toNum/10)
    }
 
    // 親要素の高さ
    let rollHeight = container.clientHeight
 
    let midArray = []
 
    // 半回転の秒数
    const animTime = second*1000
    const delayAmount = animTime/4
   
 
   
    // 回転方向 true=下回転 false=上回転
    let direction = fromNum-to < 0 ? true : false;
 
    // fromからtoまでの差分をmidArrayに入れる(回転方向による)
    [...from].forEach((num,idx) => {
        let newNum
        if(direction){
            newNum = toArray[idx]-Number(num.textContent)
        }
        else{
            newNum = Number(num.textContent)-toArray[idx]
        }
        if (newNum < 0){
            newNum+=10
        }
        midArray.push(newNum)
    });
 
    rollHeight *= direction?1:-1;
 
    [...from].forEach((num,idx) => {
        const arrNum = midArray[idx]
        // delayを分割
        const newDelay = (animTime-(delayAmount*2))/(arrNum*2)
 
        // 最初・最後のアニメーションディレイ
        let lastDelay = 0
        let firstDelay = delayAmount
 
        // 上記の調整用
        let midDelay = 0
 
            for(let j = 1;j<=arrNum;j++){
                lastDelay = j==arrNum?delayAmount:0
 
                // 最後・最初だけスローにする
                let easeOut = j==arrNum?"cubic-bezier(.17,.89,.32,1.25)":"linear"
                let easeIn = j==1?"ease-in":"linear"
                // 中心からのアニメーション
                num.animate({
                    transform:["translateY(0px)",`translateY(${rollHeight}px)`],
                },{
                    duration:newDelay+firstDelay,
                    delay:(newDelay*j-newDelay)*2+midDelay,
                    easing:easeIn,
                    fill:"forwards"
                })
 
                // テキストを変更
                setTimeout(() => {
                    let newText
                    newText = direction?Number(num.textContent)+1:Number(num.textContent)-1
                    newText = newText >= 10 ? 0:newText
                    newText = newText < 0 ? 9:newText
                    num.textContent = newText
                    },newDelay+newDelay*2*(j-1)+firstDelay+midDelay)
                // 上・下から中心へのアニメーション
                num.animate({
                    transform:[`translateY(${-1*rollHeight}px)`,"translateY(0px)"],
                },{
                    duration:newDelay+lastDelay,
                    delay:newDelay+newDelay*2*(j-1)+firstDelay+midDelay,
                    easing:easeOut,
                    fill:"forwards"
                })
                firstDelay=0
                midDelay=delayAmount
            }
    });
    let bgnum=0
    bginterval= setInterval(()=>{
        bg.style.backgroundImage=`url(${bgimage[bgnum]})`
        bgnum++
    },loadspeed/bgimage.length*1000)
    setTimeout(() => {
        console.log("a")
        clearInterval(bginterval)
    }, loadspeed*1000);
}
const nagoyakun=document.getElementById("year-container")
const text=document.getElementsByClassName("year")
const hide=document.getElementById("hide")
rollNum( nagoyakun,text,2026,loadspeed)
rollNum(nagoyakun,text,)

setTimeout(() => {
    nagoyakun.style.display="none"
    hide.style.display="block"
}, (loadspeed+1)*1000);


// スティック操作
let keyarray=[]
window.addEventListener("keydown",(e)=>{
    if(e.key === "w"){
        keyarray.push("w")
       up() 
    }
    if(e.key === "a"){
        const stick=document.getElementById("stick").src="image/スティック/1x/left.png"
        
    }
    if(e.key === "d"){
        const stick=document.getElementById("stick").src="image/スティック/1x/right.png"
    }
     if(e.key === "s"){
        const stick=document.getElementById("stick").src="image/スティック/1x/bottom.png"
    }
})


window.addEventListener("keyup",(e)=>{
    // if(e.key === "w"){
         const stick=document.getElementById("stick").src="image/スティック/1x/middle.png"
    // }
})






function up(){
     const stick=document.getElementById("stick").src="image/スティック/1x/top.png"
}