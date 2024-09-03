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
import PrivateRouteProtector from "./services/privateRouteProtector";
import CreateTransaction from "./pages/dashboard/createTransaction";
import Contract from "./pages/dashboard/contract";
import NotFound from "./pages/errors/NotFound";


function App() {
	return (
		<Routes>
			{/* ERRORS */}
			<Route path="*" element={<NotFound />} />

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
			<Route
				path="/dashboard"
				element={
					<PrivateRouteProtector>
						<DashboardLayout><Contract /></DashboardLayout>
					</PrivateRouteProtector>
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRouteProtector>
						<DashboardLayout><ProfilePage /></DashboardLayout>
					</PrivateRouteProtector>
				}
			/>
			<Route
				path="/create-transaction"
				element={
					<PrivateRouteProtector>
						<DashboardLayout><CreateTransaction /></DashboardLayout>
					</PrivateRouteProtector>
				}
			/>
		</Routes>

	);
}

export default App;
