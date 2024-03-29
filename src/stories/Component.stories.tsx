import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "../lib";

export default {
  title: "Storybook/Dot Matrix Chart",
  component: Component,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const DotMatrixExample = Template.bind({});
DotMatrixExample.args = {
  dimensions: {
    rows: 5,
    columns: 5
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
      "@media (maxWidth: 768px)": {
        width: "50%"
      },
      "@media (maxWidth: 480px)": {
        width: "40%"
      }
    })
  },
  dimensions: {
    rows: 8,
    columns: 8
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

export const DotMatrixWithGradientDot = Template.bind({});
DotMatrixWithGradientDot.args = {
  showLegend: true,
  dimensions: {
    rows: 6,
    columns: 5
  },
  legendPosition: "right-start",
  dataPoints: [
    {
      name: "Art",
      count: 21,
      color: "#FFD700"
    },
    {
      name: "Science",
      count: 23,
      color: "#ADD8E6"
    },
    {
      name: "Sports",
      count: 24,
      color: "#FFA07A"
    },
    {
      name: "Nature",
      count: 21,
      color: "#98FB98"
    },
    {
      name: "Travel",
      count: 25,
      color: "#FFB6C1"
    }
  ]
};
