$('#btn1').onclick = function () {
    let username = $('#username').value;
    let password = $('#pwd').value;
    // let phone=$('#pho').value
    if (username.trim().length == 0) {
        alert('账号不能为空')
        return;
    }else if(!isMobil(username)&&!isEmail(username)){
        alert('请输入正确的账号')
        return;
    }
    if (password.trim().length == 0) {
        alert('请输入密码')
        return;
    } else if (!isPwd(password)) {
        alert('密码只能为6-20个字母、数字、下划线')
        return;
    }
    // 根据账号和密码去server拿数据，返回是空则输入的账户密码有误
    axios.get(`http://localhost:3000/use?name=${username}`).then(({data})=> {
        // console.log(data[0].pwd)
        if (data==''||password!=data[0].pwd) {
            alert('您输入的账户或密码有误')
            return; 
        }
        // console.log(data[0].name)
        localStorage.setItem('uname',data[0].name)
            alert('登录成功')
        location.href="../html/index1.html";
        
        }
    )
};

// 手机号验证
function isMobil(s) {
    let patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){8})+$/;
    if (!patrn.exec(s)) return false
    return true;
}
// 邮箱账号
function isEmail(s) {
    let patrn = /^(\w-*\.*)+@(\w-?)+(\.\w{2,4})+$/;
    if (!patrn.exec(s)) return false
    return true;
}

// 密码验证(6-20位数字、字母、下划线)
function isPwd(s) {
    let patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s)) return false
    return true;
}




function $(ele) {
    return document.querySelector(ele)
}
    // url:http://localhost:3000/use,
    //         "username":username,
    //         "pwd":password,
    // `username=${username}&pwd=${password}`