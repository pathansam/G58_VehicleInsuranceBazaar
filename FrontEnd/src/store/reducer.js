const initialState={
    IsLoggedIn:sessionStorage.getItem("email")!==null,
    Username: sessionStorage.getItem("uname")===null ?"":sessionStorage.getItem("uname"),
    Roles: sessionStorage.getItem("roles")===null ? "":sessionStorage.getItem("roles")
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case 'IsLoggedIn':
            return {...state,
                IsLoggedIn:true,
                Username:sessionStorage.getItem("uname"),
                Roles:sessionStorage.getItem("roles")
            } 
        case 'LogOut':
            sessionStorage.clear()
            return {...state,IsLoggedIn:false,Username:'',Roles:[]}
        default:
            return state
    }
}

export default reducer;