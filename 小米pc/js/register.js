$('.txt2').onclick = function () {
    let username = $('#username').value;
    let password = $('#pwd').value;
    let repwd = $('#pwds').value
    // let phone=$('#pho').value
    if (username.trim().length == 0) {
        alert('账号')
    }else if(!isMobil(username)&&!isEmail(username)){
        alert('请输入正确的账号')
        return;
    }
    if (password.trim().length == 0) {
        alert('请输入密码');
    } else if (!isPwd(password)) {
        alert('密码只能为6-20个字母、数字、下划线')
        return;
    }
    if (repwd.trim().length == 0) {
        alert('请确认密码');
        return;
    }else if(repwd.trim()!=password.trim()){
        alert('两次密码输入不一致')
        return;
    }
    // 用get获取和输入的账户密码一致的数据(get是拿，post是传入)
    axios.get(`http://localhost:3000/use?name=${username}`).then(({data}) => {
        // console.log(data[0].name)
        // console.log(data)
        if (data!=''&&username==data[0].name) {
            alert('账户已存在，请直接登录')
            return;
        }else{
            // 如果账户不存在，则向数据库添加
            axios.post('http://localhost:3000/use',{
                    name:username,
                    pwd:password
            }).then(({data})=>{
                // console.log(data)
                localStorage.setItem('uname',data.name)
                alert('注册成功')
                location.href="../html/index1.html";
            })
        }
        
        }
    )
};
// {
//     params:{
//     name: username,
//     pwd: password
//     }



// 手机号验证
function isMobil(s) {
    let patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!patrn.exec(s)) return false 
    return true;
}
// 邮箱账号
function isEmail(s) {
    let patrn=/^(\w-*\.*)+@(\w-?)+(\.\w{2,4})+$/;
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