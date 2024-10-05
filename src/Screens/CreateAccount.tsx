import React, { useEffect, useState } from "react";
import LoginPageHeader from "./LoginPageHeader";
import { TextField } from "@mui/material";
import style from "./CreateAccount.module.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import MySupClient from "../SupabaseClient";
import { E164Number } from "libphonenumber-js/types.cjs";
import toast from "react-hot-toast";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [supabase] = useState(() => MySupClient());
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [mobile, setMobile] = useState<E164Number>("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");


  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function (adjust as needed)
  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    if (/\s/.test(password)) {
      return "Password should not contain spaces";
    }
    return null; // Password is valid
  };

  async function userSignUp() {
    // Reset errors
    setEmailError("");
    setPassError("");
    setFirstNameError("");
    setLastNameError("");
    setTermsError("");


    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      return;
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      return;
    }

    // Perform validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const passwordError = validatePassword(pass1);
    if (passwordError) {
      setPassError(passwordError);
      return;
    }

    if (pass1 !== pass2) {
      setPassError("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      setTermsError("You must accept the terms and conditions");
      return;
    }

    setLoading(true);
    const data = await supabase.auth.signUp({
      email: email,
      password: pass1,
    });

    if (data.error) {
      alert(data.error.message);
      setLoading(false);
      return;
    }

    if (data.data.user?.aud === "authenticated") {
      // Set User name
      const userData = await supabase.auth.updateUser({
        data: { fullName: `${firstName} ${lastName}`, phone: mobile },
      });
      console.log("username", userData);
      toast.success("Account Activated, Please Log In.");
      navigate("/login");
    }

    setLoading(false);
  }

  async function checkLogin() {
    const session = await supabase.auth.getSession();
    console.log(session);
    if (session.data.session !== null) {
      var inTable = await supabase
          .from("DriverDetails")
          .select("*")
          .eq("userId", session.data.session.user.id)
          .then((data) => {
            console.log(data);
            if (data.data!.length === 0) {
              navigate("/driverRegistration");
            } else {
              navigate("/driverDashboard");
            }
          });
    }
    return;
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
      loading ? (
          <>
            <div>Loading...</div>
          </>
      ) : (
          <LoginPageHeader>
            <div className={style.LoginSection}>
              <div style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}>
                <b>Create your account</b>
              </div>
              <div style={{ display: "flex", gap: "2%" }}>
                <TextField
                    onChange={(text) => setFirstName(text.target.value)}
                    placeholder="First name"
                    variant="standard"
                    error={!!firstNameError}
                    helperText={firstNameError}
                />
                <TextField
                    onChange={(text) => setLastName(text.target.value)}
                    placeholder="Last name"
                    variant="standard"
                    error={!!lastNameError}
                    helperText={lastNameError}
                />
              </div>
              <div>
                <TextField
                    onChange={(text) => setEmail(text.target.value)}
                    placeholder="Email"
                    variant="standard"
                    error={!!emailError}
                    helperText={emailError}
                />
              </div>
              <div>
                <TextField
                    onChange={(text) => setPass1(text.target.value)}
                    placeholder="Enter password"
                    variant="standard"
                    error={!!passError}
                    helperText={passError}
                />
              </div>
              <div>
                <TextField
                    onChange={(text) => setPass2(text.target.value)}
                    placeholder="Re-enter password"
                    variant="standard"
                    error={!!passError}
                    helperText={passError}
                />
              </div>
              <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                    label={
                      <>
                        I agree to the{' '}
                        <a href="/termsAndConditions" style={{ textDecoration: "none" }}>
                          terms and conditions
                        </a>
                      </>
                    } />
                {termsError && <div style={{ color: "red" }}>{termsError}</div>}
              </FormGroup>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <button
                    onClick={userSignUp}
                    style={{
                      backgroundColor: "#D69F29",
                      color: "white",
                      padding: "5px 50px",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "20px",
                      cursor: "pointer"
                    }}
                >
                  Next
                </button>
              </div>
            </div>
          </LoginPageHeader>
      )
  );
};

export default CreateAccount;
