import { useEffect, useState } from "react";

import { DEFAULT_DOT_CONTAINER_WIDTH } from "../constants";
import { findContainerWidth } from "../utils/utils";

const useChartContainerWidth = (
  id: string,
  dependencyArray: Array<boolean | string | number | undefined>
): number => {
  const [width, setWidth] = useState<number>(DEFAULT_DOT_CONTAINER_WIDTH);

  useEffect(() => {
    updateContainerWidth();
  }, [...dependencyArray]);

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", updateContainerWidth);

      return () => {
        window.removeEventListener("resize", updateContainerWidth);
      };
    }
  }, []);

  const updateContainerWidth = (): void => {
    let widthValue;
    if (typeof window !== undefined) {
      widthValue = findContainerWidth(id);
      setWidth(widthValue);
    }
  };
  return width;
};

export default useChartContainerWidth;
