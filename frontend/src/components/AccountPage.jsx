import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Card,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BarsOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { message, Drawer, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function AccountPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    message.success("Logged out");
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <IconButton variant="text" size="lg" onClick={showDrawer}>
          {open ? <XMarkIcon className="h-8 w-8 stroke-2" /> : <BarsOutlined />}
        </IconButton>
      </Space>
      <Drawer placement="left" closable={false} onClose={onClose} open={open}>
        <Card color="transparent" shadow={false} className="h-full ">
          <div className="mb-2 flex items-center  ">
            <CloseOutlined className="h-8 w-8" onClick={onClose} />
            <Typography variant="h5" color="blue-gray">
              EduTrack
            </Typography>
          </div>
          <List>
            <ListItem onClick={() => navigate("/employee")}>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </ListItemPrefix>
              Employees
            </ListItem>
            <ListItem onClick={() => navigate("/account-info")}>
              <ListItemPrefix>
                <UserOutlined />
              </ListItemPrefix>
              Account Details
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
