import { usePhishings } from "@/context";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export function CreatePhishing() {
  // Hooks
  const phishing = usePhishings();

  // State
  const [recipient, setRecipient] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [error, setError] = useState<string>("");

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRecipient(event.target.value);
    },
    []
  );

  const handleSubjectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(event.target.value);
    },
    []
  );
  const handleSubmit = useCallback(async () => {
    setError(""); // Reset error

    if (!recipient || !subject) {
      setError("Email and subject are required.");
      return;
    }

    // Handle form submission logic here
    console.log("Email submitted:", recipient);

    const response = await phishing.createPhishing({ recipient, subject });
    console.log("Phishing created:", response);
  }, [phishing, recipient, subject]);

  return (
    <Box>
      <Stack sx={{ width: "50%" }} spacing={3}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="recipient"
          >
            Recipient Email
          </Typography>
          <TextField
            size="small"
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="subject"
          >
            Subject
          </Typography>
          <TextField
            size="small"
            onChange={handleSubjectChange}
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            color="error"
          >
            {error}
          </Typography>
        </Box>

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
      </Stack>
    </Box>
  );
}
