import FormControl from '@mui/material/FormControl';
import { FormHelperText, Input, InputLabel } from '@mui/material';

function SignIn2() {
    return (
        <FormControl>
            <InputLabel htmlFor='my-input'>Email address</InputLabel>
            <Input id='my-input' aria-describedby='my-helper-text' />
            <FormHelperText id='my-helper-text'>We'll never share your email.</FormHelperText>
        </FormControl>
    );
}

export default SignIn2;
