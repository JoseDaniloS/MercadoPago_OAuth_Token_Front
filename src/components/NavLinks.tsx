import { useNavigate } from "react-router-dom";

interface NavLinkProps {
  path: string;
  label: string;
}

export function NavLink({ path, label }: NavLinkProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  const isActive = window.location.pathname === path;

  return (
    <button
      onClick={handleNavigate}
      className={`cursor-pointer font-extrabold transition-colors duration-200 ${
        isActive ? "text-primary border-t" : "text-text-gray hover:text-white " 
      }`}
    >
      {label}
    </button>
  );
}