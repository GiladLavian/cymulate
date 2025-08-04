import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";

interface registerType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  // Hooks
  const router = useRouter();
  const { signup } = useAuth();

  // State
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const handleFirstNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(event.target.value);
    },
    []
  );

  const handleLastNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(event.target.value);
    },
    []
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    setError(null); // Reset error state

    if (!email || !password || !firstName || !lastName) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await signup(email, password, firstName, lastName);

      if (response) {
        router.push("/authentication/login"); // Redirect to login page on successful registration
      } else {
        setError("Registration failed: No access token received");
      }
    } catch (e) {
      const error = e as Error;
      setError(
        error.message || "An unexpected error occurred. Please try again later."
      );
    }
  }, [email, firstName, lastName, password, router, signup]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            First Name
          </Typography>
          <CustomTextField
            onChange={handleFirstNameChange}
            id="firstName"
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
            mt="25px"
          >
            Last Name
          </Typography>
          <CustomTextField
            onChange={handleLastNameChange}
            id="lastName"
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            onChange={handleEmailChange}
            id="email"
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            onChange={handlePasswordChange}
            id="password"
            variant="outlined"
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            color="error"
            mb="5px"
            mt="25px"
          >
            {error}
          </Typography>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
