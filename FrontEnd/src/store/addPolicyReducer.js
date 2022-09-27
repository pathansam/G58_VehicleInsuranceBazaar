const initialState={
    chesisNo:"",
    policyId:"",
    policy:{},
    policies:[]
}

const  addPolicyReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case 'AddChasisNo':   
            console.log(action.payload)         
            return {...state,
                chesisNo:action.payload} 
        case 'AddPolicyId':            
            return {...state,
            policyId:action.payload}
       
        case 'SetPolicy':
        return{
        ...state,policies:action.payload
                }
        default:
            return state
    }
}

export default addPolicyReducer;