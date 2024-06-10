import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../lib/hooks";
import { logOut as logOut } from "../features/authentication-slice";

import { Group } from "@mantine/core";
import {
  IconSubtask,
  IconDashboard,
  IconSettings,
  IconReceipt2,
  IconLogout,
  IconMessage2,
} from "@tabler/icons-react";
import classes from "./Sidebar.module.css";
import ProfileInfo from "./ProfileInfo";

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/contributions", label: "Contributions", icon: IconReceipt2 },
  { link: "/tasks", label: "Tasks", icon: IconSubtask },
  { link: "/chat", label: "Chat", icon: IconMessage2 },
  { link: "/settings", label: "Other Settings", icon: IconSettings },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const path = useLocation()
  function logoutHandler() {
    dispatch(logOut());
  }

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === path.pathname || undefined}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <ProfileInfo />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={logoutHandler}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default Sidebar;
