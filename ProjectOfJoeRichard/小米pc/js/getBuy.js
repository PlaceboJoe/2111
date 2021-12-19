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

// 点击加入购物车
function addCart(that) {
    let pPrice=document.querySelector('.price').innerHTML
    let pName=document.querySelector('.getbuy-middle-box1>h3').innerHTML
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
    // console.log(pVersion.replace(/[+]/g,"")) 

    // console.log(name)
    // 用手机名字,颜色，价格，版本为关键字去数据库拿数据
    // 注意:此处的版本不能为类如8G+256G的格式，必须去除+号，不然拿回的是空数组
    axios.get(`http://localhost:3000/carts?goodsname=${pName}&price=${pPrice}&color=${pColor}&version=${pVersion}`).then(({data})=>{
        // console.log(data)
        // 如果返回为空数组，就表示数据库中没有此项商品，post增一条
        if (data=='') {
            axios.post('http://localhost:3000/carts',{
                goodsname:pName,
                price:pPrice,
                color:pColor,
                version:pVersion,
                num:1
            })
            localStorage.setItem(`${pName}`,1)
        }else if(data[0].price==pPrice){ // 如果数据库里面有,就修改数据库中和localstorage中的数量,
            // console.log(data[0].goodsname)
            let id=data[0].id

            // 点击一次购物车,拿出num+1一次
            let num=data[0].num+1
            // 注意:axios.put()的请求方式地址必须拼接/id，不然会403
            axios.put(`http://localhost:3000/carts/${id}`,{
                goodsname:pName,
                price:pPrice,
                color:pColor,
                version:pVersion,
                num:num
            }).then(data=>{
                // console.log(data)
                localStorage.setItem(`${pName}`,num)
            })
        }
    })

    // let name=localStorage.getItem('pName')
    // if (name==null) {
    //     localStorage.setItem(`${pName}`,1)
    // }else{
        
    // }

}