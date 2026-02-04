import { scrollToSection } from "../utils/functions";


export function AnchorLinks({menuItems, footer}) {
  return (
    <nav className={`flex text-[#FFFFFFDE] gap-[20px] ${footer ? "": "max-md:hidden"} text-base list-none font-medium`}>
      {menuItems.map(item =>
          <li key={item.name}>
            <a
              href={item.href}
              className="transition-colors duration-500 hover:text-white"
              onClick={e => {
                e.preventDefault();
                scrollToSection(item.href);
                setShowMobile(false); // Fechar o menu após clicar
              }}
            >
              {item.name}
            </a>
          </li>
        )}
    </nav>
  );
}
