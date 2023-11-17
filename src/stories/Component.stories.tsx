import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "../lib";

export default {
  title: "Storybook/Dot Matrix Chart",
  component: Component,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const DotMatrixExample = Template.bind({});
DotMatrixExample.args = {
  dimensions: {
    rows: 5,
    columns: 10
  },
  dataPoints: [
    {
      name: "Electronics",
      count: 25
    },
    {
      name: "Fashion",
      count: 18
    },
    {
      name: "Home & Garden",
      count: 12
    },
    {
      name: "Sports & Outdoors",
      count: 30
    },
    {
      name: "Beauty & Personal Care",
      count: 15
    }
  ]
};

export const DotMatrixWithCustomStyles = Template.bind({});
DotMatrixWithCustomStyles.args = {
  styles: {
    LegendContainer: () => ({
      border: "1px solid white",
      width: "60%",
      "@media (max-width: 768px)": {
        width: "50%"
      },
      "@media (max-width: 480px)": {
        width: "40%"
      }
    })
  },
  showLegend: true,
  legendPosition: "right",
  dataPoints: [
    {
      name: "Technology",
      count: 15,
      color: "#4CAF50"
    },
    {
      name: "Healthcare",
      count: 5,
      color: "#FF5722"
    },
    {
      name: "Finance",
      count: 10,
      color: "#2196F3"
    },
    {
      name: "Education",
      count: 10,
      color: "#FFC107"
    },
    {
      name: "Entertainment",
      count: 10,
      color: "#9C27B0"
    }
  ]
};