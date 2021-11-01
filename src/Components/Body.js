import CanvasContainer from "./Canvas/CanvasContainer";
import { useState, useContext } from "react";
import ThemeContext from "../Components/Context/ContextStates";

import ThemeContextGeneral from "../Components/Context/GeneralInfo";
import Errors from "../Components/Errors/Errors";

const Body = () => {
  const [errors, setErrors] = useState({
    incorrectSymbol: "",
  });
  const { nodes, setNodes } = useContext(ThemeContext);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const [inputString, setInputString] = useState("");
  const [ready, setReady] = useState(false);
  const [finalResultInfo, setFinalResult] = useState("");
  
  const handleIncorrectSymbolChanges = (inputString) => {
    if (inputString.length >= 0 && generalInfo.alphabet.length > 0) {
      const input = [...inputString];

      let incorrect_symbols = [
        ...new Set(
          input.filter((elem) => !generalInfo.alphabet.includes(elem))
        ),
      ];
      if (incorrect_symbols.length && input.length) {
        setErrors((e) => ({
          ...errors,
          incorrectSymbol: (
            <>
              <b>
                ERROR - <i> IMPOSSIBLE INPUT </i>
              </b>
              <br></br>
              the symbols '{incorrect_symbols.toString()}' don't exist in the
              alphabet<br></br>
              <br></br>
            </>
          ),
        }));
        if(ready)setReady(false)

        // result = false; <---------------------------------------------
      }
      if (incorrect_symbols.length === 0) {
        setErrors((e) => ({ ...errors, incorrectSymbol: "" }));

      }
    }
  };

  const finalResult = (runInfo) => {
    if (runInfo.finalState.length && nodes.length) {
      const infoFinal = runInfo.finalState.split(":");

      const state = nodes.find((nod) => nod.id === infoFinal[1]);

      const acceptance = state.final ? (
        <>
          {" "}
          <span style={{ color: "green" }}>accepted.</span>
          <br></br>
          <br></br>
        </>
      ) : (
        <>
          {" "}
          <span style={{ color: "red" }}> rejected.</span>
          <br></br>
          <br></br>
        </>
      );
      const htmlResult = (
        <>
          <br></br>
          <b>RESULTS:</b>
          <br></br> [input: "{infoFinal[0]}" , end state: "{state.name}"]
          &#x279C;
          {acceptance}
        </>
      );
      setFinalResult(htmlResult);
      setInputString('')
    }
  };


  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CanvasContainer
            handleIncorrectSymbolChanges={handleIncorrectSymbolChanges}
            inputString={inputString}
            setInputString={setInputString}
            cb={finalResult}
            ready={ready}
        />
        <div className={"h-100 col-3 mx-auto border-start border-5 mt-4 ps-2"}>
          <div className="errors">
            {errors.incorrectSymbol}
            <Errors
              inputString={inputString}
              ready={ready}
              setReady={setReady} 
              errorsSymbols={errors.incorrectSymbol}
        
            />
            <div className="accepted">
              {finalResultInfo}
            </div>
          </div>
        </div>
      </div>
    </div>   
  );
};

export default Body;
