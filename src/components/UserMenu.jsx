import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const UserMenu = ({ onLogout, onGetUsers }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    return (
        <div>
            <Button
                variant="contained"
                onClick={(event) => { setAnchorEl(event.currentTarget) }}
            >
                MENU
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => { setAnchorEl(null) }}
            >
                <MenuItem onClick={onGetUsers}>Display Users</MenuItem>
                <MenuItem onClick={onLogout}>Log out</MenuItem>
            </Menu>
        </div>
    );
}

export default UserMenu;