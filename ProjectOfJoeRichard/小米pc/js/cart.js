// 右上登录注册变化
function view() {
    let loginchange=document.querySelectorAll('#J_userInfo .link')

    // console.log(loginchange[0])
    let uname=localStorage.getItem('uname')
    uname===null&&console.log('未登录')
    if (uname!==null) {
        // 如果localstorage里面有uname，'登录'变账户，'注册'变'退出' 
            loginchange[0].innerHTML=uname
            loginchange[0].href='#none'
            // login.href='./Cart.html'
            loginchange[1].innerHTML='退出'
            // loginchange[1].href='#none'
            loginchange[1].onclick=function(){
                localStorage.removeItem('uname')
                localStorage.removeItem('carts')
                location.reload()
        }
    }
}
view()

// 购物车列表变化渲染
function cartlist() {
    let alllist=document.querySelector('#J_cartListBody')
    let html=''
    // let uname=localStorage.getItem('uname') 本来想根据use下的某个name中的个人商品拿数据，可是点击加入购物车发post请求都会在数据库加一条新数据，这条新数据不会在use/name/下
    // 这样每次发请求拿数据之前判断用户登录没有(登录会发get请求看数据里有咩有这个用户，并验证密码，登录成功就会存localstorage，退出会清空)
    // 因为post，没办法现在只能把carts中所有商品拿出来
    axios.get(`http://localhost:3000/carts`).then(({data})=>{
        data.forEach(ele => {
            // console.log(ele)
            html+=`<div class="item-box"><div class="co co-check"><input type="checkbox" onclick="selone(this)"></input></div><div class="co co-img"><img src="${ele.src}" alt=""></div><div class="co co-name">${ele.goodsname}(${ele.version+ele.color})</div><div class="co co-price">${ele.price}</div><div class="co co-num">${ele.num}</div><div class="co co-total">${ele.num * parseInt(ele.price)}元</div><div class="co co-action"><span>修改</span> <span>删除</span></div></div>`
        });
        alllist.innerHTML=html
    })
}
cartlist()

// 全选
function selall() {
    let allbtn=document.querySelector('.col-check .icon-checkbox-selected')
    allbtn.addEventListener('click',function() {
        let onecheck=document.querySelectorAll('.co-check input')
        let status=allbtn.checked
        onecheck.forEach(ele=>{
                ele.checked=status
                    // 给单选的父级的父级打上标记
                if (status==true) {
                    ele.parentNode.parentNode.setAttribute('marked',1)
                }else if(status==false){
                    ele.parentNode.parentNode.setAttribute('marked',0)
                }
                // ele.parentNode.parentNode.setAttribute('marked',1)
        })
        count()
    })
    
}
selall()

// 单选
function selone(that) {
    // console.log(that.checked)
    let allinput=document.querySelectorAll('.item-box input')
    let allbtn=document.querySelector('.col-check .icon-checkbox-selected')

    // 点击用some遍历判断单选的checked是否为false，有一个为false则设置全选为false(条件判断为false，返回值是true)
    // 全部都不满足.checked==false，则设置全选为true
    let no=Array.from(allinput).some(ele=>{
       return ele.checked==false
    })
    // console.log(no)
    !no&&(allbtn.checked=true)
    no&&(allbtn.checked=false)
    count()
}

// 点击全选，单选，删除和修改都会触发的价格统计函数
function count() {
    let allinput=document.querySelectorAll('.item-box input')
    let count=document.querySelector('#J_cartTotalPrice')
    let checkednum=document.querySelector('#J_selTotalNum')
    let subtotal=0
    let num=0
    allinput.forEach(ele=>{
        if (ele.checked==true) {
            subtotal+=parseInt(ele.parentNode.parentNode.querySelector('.co-total').innerHTML)
            num+=parseInt(ele.parentNode.parentNode.querySelector('.co-num').innerHTML)
        }
    })
    console.log(subtotal)
    count.innerHTML=subtotal
    checkednum.innerHTML=num 
    
}

// 共计商品数量(实时渲染，不能靠点击事件触发)
function autocount() {
    let cartnum=document.querySelector('#J_cartTotalNum')
    let allconum=document.querySelectorAll('.co-num')
    let num=0
    console.log(allconum)
    allconum.forEach(ele=>{
        num+=ele.innerHTML
        console.log(1)
    })
    
    cartnum.innerHTML=num
}
autocount()