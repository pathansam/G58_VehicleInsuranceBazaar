import axios from "axios";

const AllVehicle=(props)=>{
    const jwt=sessionStorage.getItem("jwt");
    axios.get(`http://localhost:8080/customer?custId=${props.id}`,{ headers: { "Authorization": `Bearer ${jwt}`} })
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        }) 
}
export default AllVehicle;