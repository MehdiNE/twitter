import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

interface Props {
  text: string;
  Icon: any;
  link?: string;
}

function SidebarList({ text, Icon, link }: Props) {
  const lightTheme = useSelector((state: any) => state.theme.lightModeState);

  return (
    <div
      className={`${
        lightTheme ? "text-black" : "text-[#d9d9d9]"
      } flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation `}
    >
      {link ? (
        <NavLink
          to={link}
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          <div className="flex space-x-3">
            <Icon className="h-7 w-7" />
            <span className="hidden xl:inline">{text}</span>
          </div>
        </NavLink>
      ) : (
        <>
          <Icon className="h-7 w-7" />
          <span className="hidden xl:inline">{text}</span>
        </>
      )}
    </div>
  );
}

export default SidebarList;
