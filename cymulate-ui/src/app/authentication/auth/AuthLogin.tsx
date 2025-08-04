import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  // Hooks
  const { signin } = useAuth();
  const router = useRouter();

  // State
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setError(null); // Reset error state

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await signin(email, password);

      if (response) {
        router.push("/"); // Redirect to home page on successful login
      }
    } catch (e) {
      const error = e as Error;
      setError(
        error.message || "An unexpected error occurred. Please try again later."
      );
    }
  }, [email, password, router, signin]);

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

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            onChange={handlePasswordChange}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt="25px" mb="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            color="error"
            mb="5px"
          >
            {error}
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
