
import { Button } from "./Button";
import * as Components from './Pages/User/RoleComponent';
const Roles=(props)=>{

    return (
        <>
        <Components.div>
            <h1>Continue as </h1>
            <Components.Form>   
            {
                props.roles.map(role=>{
                
                    return <Button url="/profile">{role}</Button>
                })
                }
            </Components.Form>
            </Components.div>    
          
          
        </>
    )
}

export default Roles;