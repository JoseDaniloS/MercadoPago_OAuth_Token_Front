/**
 * Realiza um scroll suave para a seção com o ID especificado.
 * 
 * @param {string} id - O ID da seção para onde o scroll será feito.
 * @example
 * scrollToSection("about_we");
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}