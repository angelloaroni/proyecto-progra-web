export const initialObjetos = [
  { id: 1, nombre: "Teclado Mecánico Royal Kludge RK-M75", categoria: "Electrónicos", descripcion: "Encontrado en el pabellón W, piso 3. Tiene switches lineales y keycaps gris/blanco.", icono: "⌨️" },
  { id: 2, nombre: "Raqueta de Frontón con dos pelotas", categoria: "Deportes", descripcion: "Olvidada en las bancas de la zona deportiva del campus.", icono: "🎾" },
  { id: 3, nombre: "Mochila con Mouse Bloody AL90", categoria: "Electrónicos", descripcion: "Encontrada en el aula V-402. La mochila contiene un mouse óptico de alta precisión.", icono: "🎒" },
  { id: 4, nombre: "Cuaderno Justus Azul", categoria: "Útiles Estudiantiles", descripcion: "Encontrado en el tercer piso de la biblioteca, mesa de estudio individual.", icono: "📘" },
];

export const initialReclamos = [
  { id: 1, objetoId: 1, objetoNombre: "Teclado Mecánico Royal Kludge RK-M75", alumnoCodigo: "20231456", evidencia: "Tiene un sticker personalizado en la base trasera y usa switches custom." },
];

export const initialUsuarios = [
  { codigo: "20231456", nombre: "Piero Leon", activo: true },
  { codigo: "20220890", nombre: "Ana Torres", activo: true },
  { codigo: "20210055", nombre: "Carlos Flores", activo: false },
];