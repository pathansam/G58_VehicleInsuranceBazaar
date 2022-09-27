import { useEffect, useState } from 'react';
import UserService from '../../../Services/UserService';
import userService from '../../../Services/UserService';
import PolicyList from "./../PolicyList"
import "../Customer/customer.css"

function AllPolicyList() {
  const [policies, setPolicies] = useState([]);
  const [pageNo,setPageNo]=useState(1);
  const [noOfPage,setNoOfPage]=useState([]);


const getAllPolicies=(pageNo)=>{
  userService.getAll(pageNo)
  .then(response => {
    console.log('Printing policy data', response.data);
    setPolicies(response.data);
  })
  .catch(error => {
    console.log('Something went wrong', error);
  })
}

  useEffect(() => {
    UserService.getNoOfPolicies().then(res=>{
      console.log(res.data.data)
      const arr=[];
      for(var i=1;i<=Math.ceil(parseInt(res.data.data)/2);i++){
            arr.push(i)
      }
         setNoOfPage(arr)  
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
}).catch(err=>console.log(err))   
  }, []);

  useEffect(()=>{
    console.log("in page no changed")
    getAllPolicies(pageNo);
  },[pageNo])
  return (
    <>

      <div class="container my-5">
        <div class="text-center mb-5">
          <span class="text-secondary text-uppercase">Pricing</span>
          <h1 class="text-capitalize font-weight-bold">All <span class="headline">Policies</span></h1>
          <PolicyList policies={policies} />
      </div>

      </div>
        {/* {noOfPage.map(i=><button value={i} onClick={(e)=>setPageNo(e.target.value)}>&nbsp;    {i}  &nbsp;    </button>)} */}
        <div style={{margin: "0 40%",
  width: "50%",
}}>
                                    {noOfPage.map(i=><button style={{padding:10,margin:10,backgroundColor:"#9B5DE5",fontSize:"15px"}} className="btn btn-success btn-circle btn-md" value={i} onClick={(e)=> {e.preventDefault(); setPageNo(e.target.value)}}>&nbsp;    {i}  &nbsp;    </button>)}

                                    </div>
    </>
  );
}
export default AllPolicyList;