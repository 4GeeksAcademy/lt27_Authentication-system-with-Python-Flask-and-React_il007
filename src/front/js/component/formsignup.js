import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import { useNavigate } from "react-router-dom";

const Formsignup = () =>{

    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    function sendData2(e){
        e.preventDefault()
        console.log("send data2")
        console.log(email, password)
        actions.login(email, password)   
    }


    function sendData2(e){
        e.preventDefault()
        console.log("send data222")
        console.log(email, password)
		actions.signup(email, password)
		
	}

    function goToHome(){
		navigate("/")
	}
    

    return(
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData2}>
                <h1 className="title">Sign-Up</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="example"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="Password" className="form-control"></input>
                </div>
                <button type="submit" className="btn btn-primary mx-3" Navigate to="/demo">submit</button>
                <button type="submit" className="btn btn-secondary" >  Back to Log-In</button>
                
            </form>
        </div>
    )
}


export default Formsignup