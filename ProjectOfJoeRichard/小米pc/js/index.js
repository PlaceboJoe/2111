function banner(){
    let bannerimg=$$('.carousel-inner>img')
    let bannerpoint=$$('.carousel-btn>a')
    let btnLeft=$('.btnLeft')
    let btnRight=$('.btnRight')
    let index=0
        // 自动轮播
            let timer=setInterval(() => {
                if(index>=bannerimg.length){
                    index=0
                }
                change(index,bannerimg,bannerpoint)
                index++
        }, 2000);
        
        // 圆点绑定
        for (let i = 0; i < bannerimg.length; i++) {
        bannerpoint[i].onclick = function () {
            clearInterval(timer);
            index = i;
            change(index,bannerimg,bannerpoint);
            }
        }

        // 上一张
        btnLeft.onclick=function(){
            // console.log(index)
            index--
            if(index<0){
                index=bannerimg.length-1
            }
            change(index,bannerimg,bannerpoint)
        }

        // 下一张
        btnRight.onclick = function () {
        index++;
        if (index > bannerimg.length - 1) {
            index = 0;
            }
        change(index,bannerimg,bannerpoint);
        }

        // 光标悬浮在区域自动播放暂停
        onmouse(timer)
        
}
banner()
function onmouse(timer){
    let carousel=$('.carousel')
    carousel.onmouseover=function(){
        clearInterval(timer)
    }
    carousel.onmouseout=function(){
        banner()
    }
}


// 图片变动方法
function change(index,bannerimg,bannerpoint){
    for(let i=0;i<bannerimg.length;i++){
        bannerimg[i].className="item"
        bannerpoint[i].className="btn"
    }
    bannerimg[index].className="item first"
    bannerpoint[index].className="btn active"
}

// 倒计时
    // console.log(h)
    // 截至时间
    setInterval(djs, 1000)
function djs() {
    let hour=$('.clock>.hour')
    let minute =$('.clock>.minute')
    let second =$('.clock>.second')
    let endDate=new Date('2021/12/30 00:00:00') 
    let nowDate = new Date()
    let seconds = parseInt((endDate.getTime() - nowDate.getTime()) / 1000)
    // console.log(parseInt(seconds / 3600 % 24))
    let h = complement(parseInt(seconds / 3600 % 24))
    //分钟
    let m = complement(parseInt(seconds / 60 % 60))
    //秒
    let s = complement(parseInt(seconds % 60))
    hour.innerHTML=h
    minute.innerHTML=m
    second.innerHTML=s
    // console.log(h)
}
function complement(num){
    if(num<10){
       return num = '0' + num 
    }else{
        return num 
    }
}

function view(){
    let login=document.querySelector('.info-bar>.login-s')
    let loginu=document.querySelector('.login-u')
    // console.log(login.href)
    // login.innerHTML=''
    let uname=localStorage.getItem('uname')
    console.log(uname)
    uname===null&&console.log('未登录')
    if (uname!==null) {
        console.log('11')
        axios.get(`http://localhost:3000/use?name=${uname}`).then(({data})=>{
        // console.log(data)
        // login.innerHTML=data[0].name
        // login.href='./Cart.html'
        // 如果localstorage里面有uname，'登录'变账户，'注册'变'退出' 
            login.innerHTML=data[0].name
            login.href='./Cart.html'
            loginu.innerHTML='退出'
            loginu.href='#none'
            loginu.onclick=function(){
                localStorage.removeItem('uname')
                location.reload()
            }
    }).catch(data=>{
        alert('访问失败')
    })
    }

}
view()



















































function $(ele) {
    return document.querySelector(ele)
}
function $$(ele) {
    return document.querySelectorAll(ele)
}