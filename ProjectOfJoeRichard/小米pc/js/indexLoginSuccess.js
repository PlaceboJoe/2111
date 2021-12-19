
function view(){
    let login=document.querySelector('.info-bar>.login-s')
    // console.log(login.href)
    login.innerHTML=''
    let id=localStorage.getItem('id')
    // console.log(id)
    axios.get('http://localhost:3000/use',{params:{id}}).then(({data})=>{
        // console.log(data[0].name)
        login.innerHTML=data[0].name
        login.href='./Cart.html'
        // location.reload()
    }).catch(data=>{
        
    })
}
view()