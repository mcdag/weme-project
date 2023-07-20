import { Avatar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.scss';

interface IProps {
  email: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
}

function Navbar({ email, onClick }: IProps) {
  return (
    <div className="navbar">
      <div className="avatar-email">
      <div className="avatar">
        <Avatar src="/broken-image.jpg" />
      </div>
      <div className="email">
        {email}
      </div>
    </div>
    <div className="logout-button">
      <IconButton aria-label="back" size="medium" onClick={onClick}>
        <LogoutIcon fontSize="inherit" />
      </IconButton>
    </div>
  </div>
  );
};

export default Navbar;