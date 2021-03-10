import React from "react";

export function useSafeDispatch(dispatch) {
  const mount = React.useRef();

  React.useLayoutEffect(() => { //Se ejecuta previo a useEffect()
    mount.current = true;
    return () => {
      mount.current = null;
    };
  },[]);

  return React.useCallback(
    (...args) => {
      mount.current && dispatch(...args);
    },
    [dispatch]
  );
}
