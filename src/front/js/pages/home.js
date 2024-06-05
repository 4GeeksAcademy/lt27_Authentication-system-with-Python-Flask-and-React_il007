import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Form from "../component/form";
import { Navigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log("estoy en home")

	return (
		<div className="text-center mt-5">
			<h1>Sign in</h1>
			{store.auth == true ? <Navigate to="/demo"/>: <Form />}
			
			
		</div>
	);
};
