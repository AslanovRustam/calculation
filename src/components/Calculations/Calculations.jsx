import { useCallback, useEffect, useState } from "react";
import styles from "./calculations.module.css";

function Calculations({ formula }) {
  const [result, setResult] = useState(null);

  const calculateFormula = useCallback(() => {
    try {
      if (formula.length < 2) return "";
      let expression = formula.join(" ");
      expression = expression.replace(
        /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g,
        "Math.pow($1,$3)"
      );
      const evalResult = new Function("return " + expression)();
      if (isNaN(evalResult) || !isFinite(evalResult)) {
        throw new Error("Invalid calculation");
      }
      setResult(evalResult);
    } catch {
      setResult(
        "It looks like there's an error in the formula. Try rewriting the expression"
      );
    }
  }, [formula]);

  useEffect(() => {
    if (formula.length > 1) {
      calculateFormula();
    }
  }, [formula, calculateFormula]);

  return (
    <>
      {formula.length > 1 && (
        <div className={styles.result}>
          {isNaN(result) ? (
            result
          ) : (
            <span className={styles.count}>Result: {result}</span>
          )}
        </div>
      )}
    </>
  );
}

export default Calculations;
