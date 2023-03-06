

# React Dot Matrix Chart

>Dot Matrix Chart Component - NPM Package

## Installation
The easiest way to use react-dot-matrix-chart is to install it from npm and build it into your app with Webpack.
```
npm install react-dot-matrix-chart
```
You’ll need to install React separately since it isn't included in the package.

## Usage

React Dot Matrix Chart can run in a very basic mode by just providing the `dataPoints` like given below:
```
import DotMatrix from 'react-dot-matrix-chart';

<DotMatrix
    dataPoints={dataPointsArray}
/>
```
The datapoints is an array of objects with the following keys:

-  `name` - a string that represents each category

-  `count` - a number to specify the count of each category present(used to find the number of dots to be displayed)

-  `colorPreference` - a string to specify which colour to be used to represent the category in the dot matrix

An example for dataPoints array is shown below:
```
dataPointsArray = [
  {
    name: 'Category 1',
    count: 10,
    colorPreference: 'gray'
  },
  {
    name: 'Category 2',
    count: 10,
    colorPreference: 'black'
  },
  {
    name: 'Category 3',
    count: 10,
    colorPreference: 'green'
  }
];
```
You can use `title` prop to add a Title value to the dot matrix chart
```
<DotMatrix
  dataPoints={dataPointsArray}
  title="Dot Matrix"
/>
```
You can specify the number of rows or columns to be present in the chart as well.
```
<DotMatrix
  dataPoints={dataPointsArray}
  rows={5}
  columns={10}
/>
```
If the count given in the dataPoints array results in a partial percentage (decimal value), a gradient dot will be displayed as shown below

## Props

Props that can be passed to the component are listed below:

<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Description</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>dataPoints:</b> object[]</code></td>
            <td>
                 An array of category objects to specifying the count and name of each section
            </td>
            <td><code>undefined</code></td>
        </tr>
        <tr>
            <td><code><b>title?:</b> string</code></td>
            <td>
                The title of Dot Matrix chart rendered
            </td>
            <td><code>''</code></td>
        </tr>
        <tr>
            <td><code><b>rows?:</b> number</code></td>
            <td>
              The number of rows to be displayed in the chart
            </td>
            <td><code>5</code></td>
        </tr>
        <tr>
            <td><code><b>columns?:</b> number</code></td>
            <td>
               The number of columns to be displayed in the chart
            </td>
            <td><code>12</code></td>
        </tr>
        <tr>
            <td><code><b>styles?:</b> object</code></td>
            <td>
               Provides you with a bunch of callback functions to override the default styles.
            </td>
            <td><code>undefined</code></td>
        </tr>
    </tbody>
</table>

## Style Customizations

All the default styles provided by this package are overridable using the `style` prop.
the below code shows all the overridable styles:
```
<DotMatrix
  dataPoints={dataPointsArray}
  styles={{
    Title: () => ({...styles}),
    Container: () => ({...styles}),
    Dot: () => ({...styles})
  }}
/>
```
-  `Title` - overrides the chart title style
-  `Container` - overrides the dot matrix chart container style
-  `Dot` - overrides the style of each dot in the chart