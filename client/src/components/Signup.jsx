import { Form, redirect, useNavigation } from "react-router-dom";
import FormRow from "./Quiz Analysis/FormRow";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import ShowHidePassword from "./ShowHidePassword";
// import ShowHidePassword from "./showHidePassword";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/user/signup", data);
    toast.success("Registration succefull");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message, { duration: 10 * 1000 });
    return error;
  }
};

function Signup() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="POST">
      <FormRow name="name" type="text" />
      <FormRow name="email" type="email" />
      <ShowHidePassword name="password" />
      <ShowHidePassword name="confirmPassword" label="Confirm Password" />
      <button className="auth-btn" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
    </Form>
  );
}

export default Signup;
