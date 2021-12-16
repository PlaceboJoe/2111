 $('#btn1').onclick=function() {
        let username = $('#username').value;
        let password = $('#pwd').value;
        // let phone=$('#pho').value
        if (username.trim().length == 0) {
            alert('请输入用户名')

        }
        if (password.trim().length == 0) {
            alert('请输入密码');
            return;
        }
        
        axios.post('http://localhost:3000/use',{
            name:username,
            pwd:password
        }).then(data=>{
            console.log(data)
        })
    };
    function $(ele) {
        return document.querySelector(ele)
    }
    // url:http://localhost:3000/use,
    //         "username":username,
    //         "pwd":password,
    // `username=${username}&pwd=${password}`