import { useEffect, useRef, useState } from "react";
import { EMOJI_CATEGORIES } from "../../data/emojis";
import "./EmojiPicker.css";

const EmojiPicker = ({ value, onChange, label = "Ícono representativo" }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const seleccionar = (emoji) => {
    onChange(emoji);
    setOpen(false);
  };

  return (
    <div className="emoji-picker-wrapper" ref={wrapperRef}>
      <label>{label}</label>
      <button
        type="button"
        className="emoji-picker-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="emoji-picker-current">{value || "➕"}</span>
        <span className="emoji-picker-trigger-text">
          {value ? "Cambiar emoji" : "Elegir un emoji"}
        </span>
      </button>

      {open && (
        <div className="emoji-picker-panel">
          <div className="emoji-picker-tabs">
            {EMOJI_CATEGORIES.map((cat, idx) => (
              <button
                type="button"
                key={cat.nombre}
                className={`emoji-picker-tab ${tab === idx ? "active" : ""}`}
                onClick={() => setTab(idx)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
          <div className="emoji-picker-grid">
            {EMOJI_CATEGORIES[tab].emojis.map((emoji) => (
              <button
                type="button"
                key={emoji}
                className={`emoji-picker-item ${value === emoji ? "selected" : ""}`}
                onClick={() => seleccionar(emoji)}
                aria-label={`Elegir ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;