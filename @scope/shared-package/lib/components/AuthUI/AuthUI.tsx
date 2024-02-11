
import React, { useRef } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

interface AuthUIProps {
  username: string;
  password: string;
  onSubmit: (username: string, password: string) => void | null;
}

interface AuthFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  scope: HTMLInputElement;
  persistent: HTMLInputElement;
}

interface AuthUIElement extends HTMLFormElement {
  readonly elements: AuthFormElements;
}


// export default function AuthUI({ username, password, onSubmit }: AuthUIProps) {
//   const [usernameValue, setUsernameValue] = React.useState(username);
//   const [passwordValue, setPasswordValue] = React.useState(password);

//   const setUsername = (newUsername: string) => {
//     setUsernameValue(newUsername);
//   };

//   const getUsername = () => {
//     return usernameValue;
//   };

//   const setPassword = (newPassword: string) => {
//     setPasswordValue(newPassword);
//   };

//   const getPassword = () => {
//     return passwordValue;
//   };




const AuthUI = ({ username, password, onSubmit }: AuthUIProps) =>{
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const persistentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<AuthUIElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.username.value,
      password: formElements.password.value,
      persistent: formElements.persistent.checked,
    };

    if (!data.email || !data.password) {
      return;
    }

    onSubmit(data.email, data.password);
  };

  function handleUsernameBlur(event: React.FocusEvent<HTMLInputElement>): void {
   
  }

  function handlePasswordBlur(event: React.FocusEvent<HTMLInputElement>): void {
    
  }

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          my: 'auto',
          py: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 400,
          maxWidth: '100%',
          mx: 'auto',
          borderRadius: 'sm',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          },
          [`& .${formLabelClasses.asterisk}`]: {
            visibility: 'hidden',
          },
        }}
      >
        <Stack gap={4} sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input ref={usernameRef}
                name="username" type="text"
                defaultValue={username}
                autoComplete="off"
                onBlur={handleUsernameBlur} />
            </FormControl>
            <FormControl required>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} name="password" type="password" defaultValue={password} autoComplete="off" onBlur={handlePasswordBlur} />
            </FormControl>
            <FormControl>
              <Checkbox ref={persistentRef} name="persistent" defaultChecked={false} />
              <FormLabel>Persistent</FormLabel>
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}

export default AuthUI;