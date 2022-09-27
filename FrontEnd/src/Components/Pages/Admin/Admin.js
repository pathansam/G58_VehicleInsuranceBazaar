
import React, { useEffect, useState } from 'react'
import AdminService from '../../../Services/AdminService'
import Provider from './Provider';

function Admin() {
    const [providers, setProviders] = useState([]);
    const [providers1, setProviders1] = useState([]);
    
    useEffect(() => {
        AdminService.getAllProviders()
            .then(res => {
                console.log(res.data)
                setProviders(res.data.data)
                setProviders1(res.data.data)
            })
            .catch(err => { console.log(err) })
    }, [])
    const nameFilter=(e)=>{
        setProviders1(providers.filter((p) => {
            if (p.user.firstName.toLowerCase().includes(e.target.value.toLowerCase())) {
                return p
            }}))
    }
    return (
        <>
            <div class="col-xs-3 mt-5 mb-4 text-gred">                                      
                                           <form class="form-inline">
                                                <input onChange={nameFilter}
                                                
                                                style={{fontSize:"20px",marginLeft:"550px",width:"50%"}} 
                                                class="form-control mr-sm-2" 
                                                type="search" placeholder="Search by Provider name" aria-label="Search" />
                                            </form>      
                                    </div>
            {
                providers1.map(p => {
                    return (
                        <Provider provider={p} />
                    )
                }
                )
            }
        </>
    )
}

export default Admin