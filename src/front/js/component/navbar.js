import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handleLogout(){
		actions.logout()
		navigate("/")
	}

	function goToSigUpForm(){
		navigate("/formsignup")
	}
    

	return (
		<nav className="navbar navbar-light bg-light float-right">
			<div className="container">
				<div className="ml-auto float-right">
					{store.auth == true ? <button onClick={()=>handleLogout()} className="btn btn-primary float-right">Logout</button> : null}
					{store.auth == false ? <button onClick={()=>goToSigUpForm()} className="btn btn-warning float-right ml-2">Sign Up</button> : null}
				</div>
			</div>
		</nav>
	);
};
