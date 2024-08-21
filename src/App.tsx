import { Route, Routes } from "react-router-dom";
import "./App.css";
// import RouteProtector from "./services/RouteProtector";
import { Signin } from "./pages/auth/signin";
import { Signup } from "./pages/auth/signup";
import { ForgotPassword } from "./pages/auth/forget_password";
// import { useAuth } from "./context/authContext";
import PublicRouteProtector from "./services/publicRouteProtector";
import DashboardLayout from "./pages/dashboard/layout";
import ProfilePage from "./pages/dashboard/profile/profile";

const Dashboard = () => {
	return <div>
		<p>Dashboard</p>
	</div>;
}

function App() {
	return (
		<Routes>
			{/* ERRORS */}


			{/* PUBLIC ROUTES */}
			<Route path="/" element={<PublicRouteProtector><Signin /></PublicRouteProtector>} />
			<Route path="/login" element={<PublicRouteProtector><Signin /></PublicRouteProtector>} />
			<Route path="/signin" element={<PublicRouteProtector><Signin /></PublicRouteProtector>} />
			<Route path="/sign-in" element={<PublicRouteProtector><Signin /></PublicRouteProtector>} />
			<Route path="/register" element={<PublicRouteProtector><Signup /></PublicRouteProtector>} />
			<Route path="/signup" element={<PublicRouteProtector><Signup /></PublicRouteProtector>} />
			<Route path="/forgot-password" element={<PublicRouteProtector><ForgotPassword /></PublicRouteProtector>} />
			{/* 
			<Route path="/reset-password" element={<ResetPassword />} /> */}

			{/* PRIVATE ROUTES */}
			{/* <Route path="/profile" element={<RouteProtector><Profile /> </RouteProtector>} /> */}
			<Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
			<Route path="/dashboard/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
		</Routes>

	);
}

export default App;
