import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormulaStore } from "./store/store";
import { fetchSuggestions } from "./services/api";
import FormulaTaglist from "./components/FormulaTaglist/FormulaTaglist";
import Calculations from "./components/Calculations/Calculations";
import { OPERATORS } from "./constants";
import styles from "./app.module.css";

function App() {
  const { formula, setFormula } = useFormulaStore();
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { data: suggestions = [] } = useQuery({
    queryKey: ["autocomplete"],
    queryFn: fetchSuggestions,
  });

  const filteredSuggestions = inputValue.trim()
    ? suggestions.filter((s) =>
        s.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current !== event.target
    ) {
      setEditingIndex(null);
    }
  };

  const handleEsc = (event) => {
    if (event.key === "Escape") {
      setEditingIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClickOutside, handleEsc]);

  const handleChange = (e) => {
    setInputValue(e.target.value || "");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (editingIndex !== null) {
        const updatedFormula = [...formula];
        updatedFormula[editingIndex] = inputValue.trim();
        setFormula(updatedFormula);
        setEditingIndex(null);
      } else {
        setFormula([...formula, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && editingIndex === null) {
      setFormula(formula.slice(0, -1));
    }
  };

  const handleTagClick = (index) => {
    setEditingIndex(index);
    setInputValue(String(formula[index] || ""));
  };

  const handleSelectSuggestion = (index, newValue) => {
    const updatedFormula = [...formula];
    updatedFormula[index] = String(newValue);
    setFormula(updatedFormula);
    setEditingIndex(null);
    setInputValue("");
  };

  const handleOperatorClick = (operator) => {
    setFormula([...formula, operator]);
  };

  const handleRemoveTag = (index) => {
    setFormula(formula.filter((_, i) => i !== index));
  };

  return (
    <section className={styles.container}>
      <div className={styles.inputWrapper}>
        <FormulaTaglist
          formula={formula}
          editingIndex={editingIndex}
          inputRef={inputRef}
          inputValue={inputValue}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleTagClick={handleTagClick}
          filteredSuggestions={filteredSuggestions}
          dropdownRef={dropdownRef}
          handleSelectSuggestion={handleSelectSuggestion}
          handleRemoveTag={handleRemoveTag}
        />
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
            placeholder="Type formula..."
          />
          {editingIndex === null && filteredSuggestions.length > 0 && (
            <ul className={styles.dropdown} ref={dropdownRef}>
              {filteredSuggestions.map((s, i) => (
                <li
                  key={i}
                  className={styles.suggestionItem}
                  onClick={() => {
                    setFormula([...formula, s.value]);
                    setInputValue("");
                  }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.operators}>
        {OPERATORS.map((item) => (
          <button
            key={item}
            onClick={() => handleOperatorClick(item)}
            className={styles.operatorButton}
          >
            {item}
          </button>
        ))}
      </div>
      <Calculations formula={formula} />
    </section>
  );
}

export default App;
