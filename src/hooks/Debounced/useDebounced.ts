import {useCallback} from "react";
import _ from "lodash";

type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;

const useDebouncedFunction = (functionToDebounce: CallbackFunctionVariadicAnyReturn,interval=650,deps=[]) => {
    return useCallback(_.debounce(functionToDebounce, interval), deps);
}

export default useDebouncedFunction;