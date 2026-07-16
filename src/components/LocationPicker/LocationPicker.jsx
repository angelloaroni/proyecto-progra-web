import { useMemo, useState } from "react";
import { EDIFICIOS, PASILLOS, salonesPorPiso } from "../../data/ubicaciones";
import "./LocationPicker.css";

const parseValor = (valor) => {
  if (!valor) return { edificio: "", piso: "", aula: "" };
  if (valor === PASILLOS) return { edificio: PASILLOS, piso: "", aula: "" };

  const partes = valor.split(" - ").map((p) => p.trim());
  const codigo = partes[0];
  const data = EDIFICIOS.find((e) => e.codigo === codigo);
  if (!data) return { edificio: "", piso: "", aula: "" };

  if (data.tipo === "fijo") {
    return { edificio: codigo, piso: "", aula: partes[1] || "" };
  }

  const pisoParte = partes[1] || "";
  const piso = pisoParte.replace("Piso", "").trim();
  const aula = partes[2] || "";
  return { edificio: codigo, piso, aula };
};

const LocationPicker = ({ value, onChange, label = "Lugar donde se encontró" }) => {
  const inicial = useMemo(() => parseValor(value), []); // solo se usa al montar
  const [edificio, setEdificio] = useState(inicial.edificio);
  const [piso, setPiso] = useState(inicial.piso);
  const [aula, setAula] = useState(inicial.aula);

  const data = EDIFICIOS.find((e) => e.codigo === edificio);

  const handleEdificioChange = (e) => {
    const codigo = e.target.value;
    setEdificio(codigo);
    setPiso("");
    setAula("");
    onChange(codigo === PASILLOS ? PASILLOS : "");
  };

  const handlePisoChange = (e) => {
    const nuevoPiso = e.target.value;
    setPiso(nuevoPiso);
    setAula("");
    onChange("");
  };

  const handleAulaChange = (e) => {
    const nuevaAula = e.target.value;
    setAula(nuevaAula);
    if (data?.tipo === "fijo") {
      onChange(`${edificio} - ${nuevaAula}`);
    } else {
      onChange(`${edificio} - Piso ${piso} - ${nuevaAula}`);
    }
  };

  return (
    <div className="location-picker">
      <label>{label}</label>
      <div className="location-picker-row">
        <select value={edificio} onChange={handleEdificioChange} required>
          <option value="" disabled>Edificio</option>
          {EDIFICIOS.map((e) => (
            <option key={e.codigo} value={e.codigo}>{e.codigo}</option>
          ))}
          <option value={PASILLOS}>Pasillos (sin salón específico)</option>
        </select>

        {data?.tipo === "pisos" && (
          <select value={piso} onChange={handlePisoChange} required>
            <option value="" disabled>Piso</option>
            {Array.from({ length: data.pisos }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>Piso {p}</option>
            ))}
          </select>
        )}

        {data?.tipo === "pisos" && piso && (
          <select value={aula} onChange={handleAulaChange} required>
            <option value="" disabled>Aula</option>
            {salonesPorPiso(piso).map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        )}

        {data?.tipo === "fijo" && (
          <select value={aula} onChange={handleAulaChange} required>
            <option value="" disabled>Ambiente / Aula</option>
            {data.opciones.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        )}
      </div>
      {edificio === PASILLOS && (
        <p className="location-picker-hint">Se registrará como: Pasillos</p>
      )}
    </div>
  );
};

export default LocationPicker;