import { scrollToSection } from "../utils/functions";


export default function MenuMobile({ showMobile, setShowMobile, menuItems }) {
  return (
    showMobile &&
    <div
      className="fixed backdrop-blur-[10px] top-0 left-0 z-40 flex flex-col items-center justify-center w-screen h-screen  bg-[#00000090]"
      onClick={() => setShowMobile(false)}
    >
      <ul className="text-[24px] text-[#FFFFFFB2] space-y-4">
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
      </ul>
    </div>
  );
}
