import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

type Props = {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  help: string;
  placeholder: string;
  type: 'email' | 'password' | 'text';
};

function setError(help: string) {
  return help.length > 0;
}

function setHelperText(help: string) {
  return help.length > 0 ? help : null;
}

function TextInput({ help, id, label, onChange, placeholder, type }: Props) {
  return (
    <TextField
      id={id}
      label={label}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      name={id}
      type={type}
      fullWidth
      error={setError(help)}
      helperText={setHelperText(help)}
    />
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  help: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'password', 'text']),
};

TextInput.defaultProps = {
  help: '',
  type: 'text',
};

export default TextInput;
