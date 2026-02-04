import { useRef, useState, useEffect } from "react";

import Cronos_Logo from "/images/Cronos_Logo.png"; // Certifique-se de que o caminho está correto
import { Twirl as Hamburger } from "hamburger-react";
import { AnchorLinks } from "../../components/AnchorLinks";
import MenuMobile from "../../components/MenuMobile";

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showMobile, setShowMobile] = useState(false) // Estado para armazenar a altura do cabeçalho
  const headerRef = useRef(null);

  // Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY <= 0) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Adiciona { passive: true } para melhorar a performance
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Calcula a altura do cabeçalho
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const menuItems = [
    { name: "Link 1", href: "#" },
    { name: "Link 2", href: "#" },
    { name: "Link 3", href: "#"},
    { name: "Link 4", href: "#" }
  ];

  return (
    <>
      {/* Cabeçalho */}
      <header
        ref={headerRef}
        className={`flex z-50 fixed transition-all duration-500 backdrop-blur-xs  ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-[100%]" // Ajuste para evitar problemas com translate-y-full
        } justify-center items-center w-full border-b-[2px] py-[16px] bg-[linear-gradient(176deg,_#0E0E0F_40%,_#1E1C31_60%)] min-h-screen"`}
      >
        <div className="w-[1170px] max-xl:w-[90vw] flex items-center justify-between">
          <div className="flex w-[140px]">
            <img src={Cronos_Logo} alt="Logo_Chronos" />
          </div>
          <AnchorLinks menuItems={menuItems} />
          
          <div className="relative md:hidden z-50">
            <Hamburger
             toggled={showMobile}
             toggle={setShowMobile}
              color="white"
            />
          </div>

            
        </div>
      </header>
      <MenuMobile showMobile={showMobile} setShowMobile={setShowMobile} menuItems={menuItems} />

    </>
  );
}