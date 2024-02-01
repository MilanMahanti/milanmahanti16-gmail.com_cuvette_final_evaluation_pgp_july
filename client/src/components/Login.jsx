import { Form, redirect, useNavigation } from "react-router-dom";
import FormRow from "./Quiz Analysis/FormRow";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import ShowHidePassword from "./ShowHidePassword";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/user/login", data, { withCredentials: true });
      queryClient.invalidateQueries();
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    }
  };

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST">
      <FormRow name="email" type="email" />
      <ShowHidePassword name="password" />
      <button className="auth-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loggging in..." : "Login"}
      </button>
    </Form>
  );
}

export default Login;
