import { Route, Routes } from "react-router-dom";
import "./App.css";
// import RouteProtector from "./services/RouteProtector";
import { Signin } from "./pages/auth/signin";

function App() {
	return (

		<Routes>
			{/* ERRORS */}


			{/* PUBLIC ROUTES */}
			<Route path="/" element={<Signin />} />
			<Route path="/login" element={<Signin />} />
			<Route path="/sign-in" element={<Signin />} />
			{/* <Route path="/register" element={<Register />} />
			<Route path="/signup" element={<Register />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/reset-password" element={<ResetPassword />} /> */}

			{/* PRIVATE ROUTES */}
			{/* <Route path="/profile" element={<RouteProtector><Profile /> </RouteProtector>} /> */}
		</Routes>

	);
}

export default App;
