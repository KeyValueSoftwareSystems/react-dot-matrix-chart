import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Component from '../lib';

export default {
    title: 'Storybook/Dot Matrix Chart',
    component: Component,
    parameters: {
      // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  } as ComponentMeta<typeof Component>;

  const Template: ComponentStory<typeof Component> = (args) => <Component {...args}/>;

export const DotMatrixExample = Template.bind({});
DotMatrixExample.args = {
  dimensions: {
    rows: 5,
    columns: 10,
  },
  styles:{

  },
  dataPoints:[
    {
      name: 'Category 1',
      count: 15,
      color: '#96C3EB'
    },
    {
      name: 'Category 2',
      count: 5
    },
    {
      name: 'Category 3',
      count: 10
    },
    {
      name: 'Category 3',
      count: 10
    },
    {
      name: 'Category 3',
      count: 10
    }
  ]
};