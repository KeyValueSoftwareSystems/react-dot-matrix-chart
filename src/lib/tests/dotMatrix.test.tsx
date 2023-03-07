import React from 'react';
import {
  render,
  fireEvent,
  queryByAttribute,
  queryAllByAttribute
} from "@testing-library/react";
import DotMatrix from '../dot-matrix';
import { DotMatrixPropType } from '../dot-matrix/types';

const getById = queryByAttribute.bind(null, 'id');
const getAllById = queryAllByAttribute.bind(null, 'id');

test("If title is rendered in Dot Matrix Chart", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [],
    title: 'Demo Title'
  }
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const title = await getById(dom.container, "dot-matrix-title");
    expect(title.innerHTML).toBe('Demo Title');
  } else {
    throw Error("No DOM Found");
  }
});

test("If all categories are displayed in Dot Matrix Chart", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [
      {
        name: 'Category 1',
        count: 10
      },
      {
        name: 'Category 2',
        count: 10
      },
      {
        name: 'Categroy 3',
        count: 10
      }
    ]
  };
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const category1 = await getById(dom.container, "each-category-0-0");
    const category2 = await getById(dom.container, "each-category-1-0");
    const category3 = await getById(dom.container, "each-category-2-0");
    if (!category1 || !category2 || !category3) throw Error("All Categories not present");
  } else {
    throw Error("No DOM Found");
  }
});

test("If no title rendered if none provided in Dot Matrix chart", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: []
  }
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const title = await getById(dom.container, "dot-matrix-title");
    if (title) throw Error("Title Present")
  } else {
    throw Error("No DOM Found");
  }
});

test("If the color is used in the Dot Matrix Chart", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [{
      name: 'Category 1',
      count: 12,
      color: 'black'
    }]
  }
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const dot = await getById(dom.container, "each-category-0-0");
    if (!dot) throw Error("Dot Absent");
    expect(dot.style._values).toEqual({ "background-color": `black` })
  } else {
    throw Error("No DOM Found");
  }
});

test("If the number of dots rendered in Dot Matrix Chart is correct", async () => {
  const dotMatrixProps: DotMatrixPropType = {
    dataPoints: [{
      name: 'Category 1',
      count: 12,
      color: 'black'
    }],
    dimensions: {
      rows: 5,
      columns: 5
    }
  }
  const dom = render(<DotMatrix {...dotMatrixProps} />);
  if (dom) {
    const dot = await getAllById(dom.container, "dot-matrix-dots");
    if (dot?.length === 0) throw Error("Dots Absent");
    expect(dot.length).toBe(25)
  } else {
    throw Error("No DOM Found");
  }
});
