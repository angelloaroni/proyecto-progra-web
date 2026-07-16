export const PASILLOS = "Pasillos";

const salonesDePiso = (piso) =>
  Array.from({ length: 7 }, (_, i) => `Aula ${piso}0${i + 1}`);

export const EDIFICIOS = [
  { codigo: "A1", tipo: "pisos", pisos: 7 },
  { codigo: "A2", tipo: "pisos", pisos: 4 },
  { codigo: "D1", tipo: "pisos", pisos: 5 },
  { codigo: "D2", tipo: "pisos", pisos: 5 },
  { codigo: "N", tipo: "pisos", pisos: 4 },
  { codigo: "L3", tipo: "pisos", pisos: 5 },
  { codigo: "I2", tipo: "pisos", pisos: 7 },
  { codigo: "O1", tipo: "pisos", pisos: 8 },
  { codigo: "O2", tipo: "pisos", pisos: 8 },
  {
    codigo: "F1",
    tipo: "fijo",
    opciones: ["Comedor", "Sala de Bienestar"],
  },
  {
    codigo: "F2",
    tipo: "fijo",
    opciones: ["Comedor F2"],
  },
  {
    codigo: "H",
    tipo: "fijo",
    opciones: ["Sala Principal", ...salonesDePiso(2), ...salonesDePiso(8)],
  },
  {
    codigo: "Comedor Central",
    tipo: "fijo",
    opciones: ["Comedor Central"],
  },
];

export const salonesPorPiso = (piso) => salonesDePiso(piso);