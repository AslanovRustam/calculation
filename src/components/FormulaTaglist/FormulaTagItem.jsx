import { useState } from "react";
import styles from "./formulaTag.module.css";

function FormulaTagItem({
  tag,
  idx,
  editingIndex,
  inputRef,
  inputValue,
  handleChange,
  handleKeyDown,
  handleTagClick,
  filteredSuggestions,
  dropdownRef,
  handleSelectSuggestion,
  handleRemoveTag,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={idx}
      className={styles.tagContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {editingIndex === idx ? (
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.editInput}
          autoFocus
        />
      ) : (
        <div className={styles.tag} onClick={() => handleTagClick(idx)}>
          {tag}
          {isHovered && (
            <span
              className={styles.removeIcon}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(idx);
              }}
            >
              ✖
            </span>
          )}
        </div>
      )}
      {editingIndex === idx && filteredSuggestions.length > 0 && (
        <ul className={styles.suggestions} ref={dropdownRef}>
          {filteredSuggestions.map(({ value, name }, i) => (
            <li
              key={i}
              className={styles.suggestionItem}
              onClick={() => handleSelectSuggestion(idx, value)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FormulaTagItem;
