import { useEffect, useState } from "react";

import { DEFAULT_DOT_CONTAINER_WIDTH } from "../constants";
import { findContainerWidth } from "../utils/utils";

const useChartContainerWidth = (
  id: string,
  dependencyArray: Array<boolean | string>
): number => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    updateContainerWidth();
  }, []);

  useEffect(() => {
    updateContainerWidth();
  }, [...dependencyArray]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateContainerWidth);

      return () => {
        window.removeEventListener("resize", updateContainerWidth);
      };
    }
  }, []);

  const updateContainerWidth = (): void => {
    let widthValue = DEFAULT_DOT_CONTAINER_WIDTH;
    if (typeof window !== "undefined") widthValue = findContainerWidth(id);
    setWidth(widthValue);
  };
  return width;
};

export default useChartContainerWidth;
