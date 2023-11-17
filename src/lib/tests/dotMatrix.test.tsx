import React from "react";
import {
  render,
  queryByAttribute,
  queryAllByAttribute,
} from "@testing-library/react";
import '@testing-library/jest-dom';

import { DotMatrixPropType } from "../dot-matrix/types";
import { getStyles, hasOverlapping } from "../dot-matrix/utils/utils";
import { Elements } from "../dot-matrix/constants";
import DotMatrix from "../dot-matrix";

const getById = queryByAttribute.bind(null, "id");
const getAllById = queryAllByAttribute.bind(null, "id");

test("If all categories are displayed in Dot Matrix Chart", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [
      {
        name: "Category 1",
        count: 10,
      },
      {
        name: "Category 2",
        count: 10,
      },
      {
        name: "Categroy 3",
        count: 10
      }
    ]
  };
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const category1 = await getById(dom.container, "each-category-0-0");
    const category2 = await getById(dom.container, "each-category-1-0");
    const category3 = await getById(dom.container, "each-category-2-0");
    if (!category1 || !category2 || !category3)
      throw Error("All Categories not present");
  } else {
    throw Error("No DOM Found");
  }
});

test("If the color is used in the Dot Matrix Chart", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [
      {
        name: "Category 1",
        count: 12,
        color: "black"
      }
    ]
  };
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const dot = await getById(dom.container, "each-category-0-0");
    if (!dot) throw Error("Dot Absent");
    expect(dot.style._values["background-color"]).toBe("black");
  } else {
    throw Error("No DOM Found");
  }
});

test("If the number of dots rendered in Dot Matrix Chart is correct", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [
      {
        name: "Category 1",
        count: 12,
        color: "black"
      }
    ],
    dimensions: {
      rows: 5,
      columns: 5
    }
  };
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const dot = await getAllById(dom.container, "dot-matrix-dots");
    if (dot?.length === 0) throw Error("Dots Absent");
    expect(dot.length).toBe(25);
  } else {
    throw Error("No DOM Found");
  }
});

test("renders DotMatrix with legend when showLegend is true", () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [
      {
        name: "Category 1",
        count: 12,
        color: "black"
      }
    ],
    showLegend: true
  };
  const { container } = render(<DotMatrix {...dotMatrixProps} />);

  const legendContainer = getById(container, "legend-container");
  expect(legendContainer).toBeInTheDocument();
});

test('getStyles util should return an empty object when no styles are provided', () => {
  const result = getStyles(Elements.Container, {});
  expect(result).toEqual({});
});

test('getStyles util should return the style object for a specific element if available',async () => {
  const mockStyle = { color: 'red', fontSize: '16px' };
  const styles = {
    [Elements.DotsContainer]: () => mockStyle,
    [Elements.Dot]: () => ({})
  };
  const result = getStyles(Elements.DotsContainer, styles);
  expect(result).toEqual(mockStyle);
});

it('should return true when [indexRow - 1] is not equal to 0 and less than 1', () => {
  const values = [2, 0.5, 1];
  const indexRow = 2;
  const indexColumn = 0;
  const result = hasOverlapping(values, indexRow, indexColumn);
  expect(result).toBe(true);
});
