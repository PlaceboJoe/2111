// 放大镜
function big(){
    let bigphone=document.querySelector('.fa-image')
    let smallbox=document.querySelector('#slider-wrap>.smallbox')
    let slider_wrap=document.querySelector('#slider-wrap')
    let bigRight=document.querySelector('.bigRight')
    let bigRightImg=document.querySelector('.bigRight img')
    slider_wrap.onmouseover=function(e) {
        smallbox.style.display="block"
        bigRight.style.display="block"
    }
    slider_wrap.onmousemove=function(e) {
        let x = e.pageX - slider_wrap.offsetLeft - smallbox.offsetWidth/2 
        let y = e.pageY - slider_wrap.offsetTop - smallbox.offsetWidth/2 
        // console.log(y)
            if(x<=0){
                x = 0
            }else if(x>=document.querySelector('.fa-image').offsetWidth - smallbox.offsetWidth){
                x = slider_wrap.offsetWidth - smallbox.offsetWidth
            }
            if(y<=0) {
                y = 0
            }else if (y>=document.querySelector('.fa-image').offsetHeight- smallbox.offsetHeight) {
                y = document.querySelector('.fa-image').offsetHeight - smallbox.offsetHeight
            }
            smallbox.style.left = x + 'px'
            smallbox.style.top = y + 'px'

            let w = x / (document.querySelector('.fa-image>img').offsetWidth - smallbox.offsetWidth)
            let h = y / (document.querySelector('.fa-image>img').offsetHeight- smallbox.offsetHeight)
            // //给大图进行赋值操作
            bigRightImg.style.left = -w * (bigRightImg.offsetWidth - bigRight.offsetWidth) + 'px'
            bigRightImg.style.top = -h * (bigRightImg.offsetHeight - bigRight.offsetHeight) + 'px'
    }
    slider_wrap.onmouseout=function() {
        smallbox.style.display="none"
        bigRight.style.display="none"
    }
}
big()

// 颜色版本选择
function picking() {
    let cpick=document.querySelector('.getbuy-middle-box2')
    let vpick=document.querySelector('.getbuy-middle-box3')
    let cpicks=document.querySelectorAll('.getbuy-middle-box2 span')
    let vpicks=document.querySelectorAll('.getbuy-middle-box3 span')
    cpick.addEventListener('click',function(e) {
        Array.from(cpicks).forEach(ele=>{
            ele.style.color="black"
            ele.style.border="1px solid black "
            ele.setAttribute('marked','')
        })
        e.target.style.color="orange"
        e.target.style.border="1px solid orange"
        e.target.setAttribute('marked',1)
        // console.log(e.target)
        
    })
    vpick.addEventListener('click',function(e) {
        Array.from(vpicks).forEach(ele=>{
            ele.style.color="black"
            ele.style.border="1px solid black "
            ele.setAttribute('marked','')
        })
        e.target.style.color="orange"
        e.target.style.border="1px solid orange"
        e.target.setAttribute('marked',1)
        // console.log(e.target)
    })
}
picking()

// 我喜欢按钮点击事件
function like(that) {
    // that.style.backgroundColor="red"
    if (that.style.backgroundColor=='') {
        // console.log(that.style.backgroundColor)
        that.style.backgroundColor="red"
        return;
    }
    if (that.style.backgroundColor=="red") {
        that.style.backgroundColor=''
        return;
    }
}

// 点击加入购物车
function addCart(that) {
    let pPrice=document.querySelector('.price').innerHTML
    let pName=document.querySelector('.getbuy-middle-box1>h3').innerHTML
    let pSrc=document.querySelector('.fa-image img').src  //此处应该拿slider下面的所有li遍历寻找轮播轮到被做标记那个，轮播没做，所以暂且固定一个了
    let cpicks=document.querySelectorAll('.getbuy-middle-box2 span')
    let vpicks=document.querySelectorAll('.getbuy-middle-box3 span')
    let uname=localStorage.getItem('uname')
    let pColor=''
    let pVersion=''
    // let cpick=document.querySelector('.getbuy-middle-box2')
    // let vpick=document.querySelector('.getbuy-middle-box3')
    if(uname==null){
        // console.log(uname)
        location.href="./login.html"
    }
    Array.from(cpicks).forEach(ele=>{
        let mark=ele.getAttribute('marked')
        if (mark==1) {
            return pColor=ele.innerHTML
        }
    })
    Array.from(vpicks).forEach(ele=>{
        let mark=ele.getAttribute('marked')
        if (mark==1) {
            // 用正则去掉+号(/[要去除的符号或其他]/g,"")，g表示这个字符串对象中全部符合的都替换成参数2，参数2为空就表示去除
            return pVersion=ele.innerHTML.replace(/[+]/g,"")
        }
    })
    console.log(pVersion)
    console.log(pPrice)
    console.log(pName)
    console.log(pColor)
    console.log(pSrc)
    // console.log(pVersion.replace(/[+]/g,"")) 

    // console.log(name)
    // 用手机名字,颜色，价格，版本为关键字去数据库拿数据
    // 注意:此处的版本不能为类如8G+256G的格式，必须去除+号，不然拿回的是空数组
    axios.get(`http://localhost:3000/carts?goodsname=${pName}&price=${pPrice}&color=${pColor}&version=${pVersion}`).then(({data})=>{
        // console.log(data)
        // 如果返回为空数组，就表示数据库中没有此项商品，post增一条
        if (data.length==0) {
            axios.post('http://localhost:3000/carts',{
                goodsname:pName,
                price:pPrice,
                color:pColor,
                version:pVersion,
                src:"../images/1.png",
                num:1
            }).then(data=>{
                alert('加入成功')
                location.reload()
                })
            localStorage.setItem(`carts`,`${pName};数量:1`)
        }else if(data[0].price==pPrice){ // 如果数据库里面有,就修改数据库中和localstorage中的数量,
            // console.log(data[0].goodsname)
            let id=data[0].id
            // 点击一次购物车,拿出num+1一次
            let num=data[0].num-0+1
            // 注意:axios.put()的请求方式地址必须拼接/id，不然会404
            axios.put(`http://localhost:3000/carts/${id}`,{
                goodsname:pName,
                price:pPrice,
                color:pColor,
                version:pVersion,
                src:data[0].src,
                num:num
            }).then(data=>{
                // console.log(data)
                alert('数量+1')
                localStorage.setItem(`carts`,`${pName};数量:${num}`)
            })
        }
    })
}

// 先从local里拿uname，有就从从数据库拿数据并渲染更改"登录"和"注册"为账户名，"退出"
function view(){
    let login=document.querySelector('.info-bar>.login-s')
    let loginu=document.querySelector('.login-u')
    let uname=localStorage.getItem('uname')
    uname===null&&console.log('未登录')
    if (uname!==null) {
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
                localStorage.removeItem('carts')
                location.reload()
            }
    }).catch(data=>{
        alert('访问失败')
    })
    }    
}
view()

// 右上角购物车数量及内容变化
function cartnum() {
    let uname=localStorage.getItem('uname')
    if (uname==null) {
        return;
    }
    let cartnum=document.querySelector('.fa-shopping-cart')
    axios.get('http://localhost:3000/carts').then(({data})=>{
        // console.log(data.length) //[{...}{...}]
        // console.log(data)
        if(data.length!=0){
            // let src=''
            // let pName=data
            let cartInfo=document.querySelector('.cart-info')
            let html=''
            Array.from(data).forEach(ele=>{
                // document.createElement('li')
                // console.log(ele.src,ele.goodsname)
                html+=`<li><img src="${ele.src}" alt="">${ele.goodsname} ${ele.price} 数量:${ele.num}<span onclick="cartdel(this,${ele.id})">删除</span></li>`
            })
            cartInfo.innerHTML=html
            cartnum.innerHTML='购物车('+data.length+')'
        }
    })
}
cartnum()
// parentNode
// cartdel点击事件
function cartdel(that,id) {
    // console.log(that.parentNode)
    that.parentNode.remove()
    axios.delete(`http://localhost:3000/carts/${id}`).then(data=>{
        // console.log(data)
        console.log('删除成功')
    })
    
}