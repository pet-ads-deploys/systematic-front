import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import LogoutButton from "./LogoutButton";

interface IDefaultNavigation {
  navSize: string;
}

const routes = [
  { path: "/user", icon: IoLibrarySharp, title: "My reviews" },
  { path: "/newReview", icon: IoCreateOutline, title: "New Revision" },
];

export default function DefaultNavigation({ navSize }: IDefaultNavigation) {
  return (
    <>
      {routes.map((route, index) => (
        <Link key={index} to={route.path}>
          <NavItem navSize={navSize} icon={route.icon} title={route.title} submenu={false} />
        </Link>
      ))}
      <LogoutButton navSize={navSize} />
    </>
  );
}