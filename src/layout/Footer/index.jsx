import { AnchorLinks } from "../../components/AnchorLinks";
import Cronos_Logo from "/images/Cronos_Logo.png";

export default function Footer() {
  const menuItems = [
    { name: "Link 1", href: "#" },
    { name: "Link 2", href: "#" },
    { name: "Link 3", href: "#" },
    { name: "Link 4", href: "#" }
  ];
  return (
    <footer className="flex flex-col w-full items-center h-full overflow-hidden bg-[#0C0B14] ">
      <div className="flex justify-between items-center py-[64px] w-[1170px] max-lg:w-[90vw] gap-8 max-lg:flex-col">
        <div className="w-[269px] flex justify-center items-center">
          <img src={Cronos_Logo} alt="Logo da Chronos" />
        </div>
        <div>
          <AnchorLinks footer menuItems={menuItems} />
        </div>
      </div>
      <div className="w-full py-4 border-t flex justify-center border-t-[#FFFFFF1A]">
        <p className="text-[14px] w-[1169px] max-xl:text-center max-xl:w-full text-[#FFFFFF99]">
          &copy; Chronos 2025 - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
