import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Authorization from "../../Authorization";

const Display = (props) => {



    const [showDialog, setShowDialog] = useState("modal fade");
    const [display, setDisplay] = useState("none");

    const [imageFile, setImageFile] = useState();
    const [showPic, setPic] = useState({});
    const [imgFlag, setImgflag] = useState(false);

    const history = useHistory();
    useEffect(() => { }, [showPic])
    const handleChange = (event) => {
        setImageFile(event.target.files[0]);
        setImgflag(true);
        console.log(imageFile);
    }
    const handleSubmission = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imageFile', imageFile)  //1st argumet 'imageFile' name must be matches with spring-boot requeat param name MultipartFile imageFile
        console.log(imageFile);
        console.log(formData);
        axios.post(`http://localhost:8080/api/users/${Authorization.getUser().userId}/image`, formData,
            { headers: { 'Content-type': 'multipart/form-data;boundary=<calculated when request is sent>' } })
            .then(res => {window.location.reload();closeDialog(); })
            .catch(err => {toast.error("error");closeDialog()});
            
    }

    useEffect(() => {
        if(props.show)
         showModal() 
        })

    const showModal = () => {
        console.log("Child call parent");
        setShowDialog("modal fade show");
        setDisplay("block");
        // setItem(prod);
    };
    const closeDialog = () => {
        setShowDialog("modal fade");
        setDisplay("none");
        props.setShow(false);
    };

    return (
        <>
            {display == "block" ? (
                <div
                    className={showDialog}
                    style={{ zIndex: "1000", display: display }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <button onClick={closeDialog} className="close">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex">
                                    <div className="ml-3">
                                        <input type="file" onChange={handleChange} style={{ width: "150%" }} name="file"></input>
                                        <button
                                            onClick={handleSubmission}
                                            className='btn btn-primary'
                                            style={{ 'margin': '10px' }}>Upload</button><button onClick={() => { closeDialog() }} className="btn btn-primary">Cancel</button>
                                        {imgFlag ? <img src={URL.createObjectURL(imageFile)} ></img> : <img src={`http://localhost:8080/api/users/5/image`} ></img>}
                                        <br /><br />

                                        {/* ${Authorization.getUser().userId} */}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    )

}

export default Display;