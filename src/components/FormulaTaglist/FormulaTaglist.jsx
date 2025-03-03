import FormulaTagItem from "./FormulaTagItem";

const FormulaTaglist = ({
  formula,
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
}) => {
  return (
    <>
      {formula.length ? (
        <>
          <span>=</span>
          {formula.map((tag, idx) => (
            <FormulaTagItem
              key={`${tag}-${idx}`}
              tag={tag}
              idx={idx}
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
          ))}
        </>
      ) : null}
    </>
  );
};

export default FormulaTaglist;
