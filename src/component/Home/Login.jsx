import img from "../../assets/image/rafiki.png";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLoginMutation } from "../../redux/features/baseApi";

function Login() {
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let email, name;

        if (tokenResponse.credential) {
          const decoded = jwtDecode(tokenResponse.credential);
          email = decoded.email;
          name = decoded.name || decoded.given_name + " " + decoded.family_name;
        } else if (tokenResponse.access_token) {
          const res = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
          );
          const data = await res.json();
          email = data.email;
          name = data.name;
        }

        if (!email || !name) throw new Error("Failed to get user info");
        const response = await googleLogin({ email, name }).unwrap();
        if (response.access) localStorage.setItem("access", response.access);
        if (response.refresh) localStorage.setItem("refresh", response.refresh);
        localStorage.setItem("email", email);

        toast.success("Google Sign Up Successful!");
        navigate("/");
      } catch (error) {
        toast.error(
          error?.data?.message || error.message || "Google login failed"
        );
      }
    },
    onError: () => {
      toast.error("Google login cancelled or failed");
    },
    flow: "implicit",
    scope: "openid email profile",
  });

  return (
    <>
      <div className="lg:flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl lg:flex w-full max-w-7xl lg:h-[75vh]">
          <div className="lg:w-1/2 p-10 lg:mt-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Log in</h2>
            <button
              onClick={() => handleGoogleLogin()}
              disabled={isGoogleLoading}
              className={`flex items-center justify-center w-full font-bold py-2 bg-gray-200 mb-6 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-200 ${
                isGoogleLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <FcGoogle size={30} className="mr-2" />
              {isGoogleLoading ? "Loading..." : "Continue with Google"}
            </button>

            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Password"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  Eye
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
              Sign In
            </button>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign up
              </NavLink>
            </p>
          </div>

          <div className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <img
              src={img}
              alt="Global business illustration"
              className="max-w-full lg:w-[90vh] h-auto object-contain"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
