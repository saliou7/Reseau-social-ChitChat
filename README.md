# React app README.md example

Use this Readme file as a template or starter document for any React application (or to replace the default Readme that ships with [Create React App](https://github.com/facebook/create-react-app)).

---

# \[Your application name\]

\[Build status badge\]

Front End application oriented to ...

## Technologies used

- [React](https://reactjs.org/) single page application
- Routing done using [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
- State management via [Redux](https://redux.js.org/)
- ... \[other technologies\]

### Architecture diagrams

... \[add diagrams here\]

## Setup

1. Clone the repository and install the dependencies
```bash
yarn install
```
2. Start the frontend application locally
```bash
yarn start
```
3. ... \[add other steps here\]

## Available commands

* `yarn start`: Start the app locally in your development environment, by default it will be in http://localhost:3000.
* `yarn test`: Run tests using watch mode.
* `yarn lint`: Run linter.
* ... \[add other commands here\]

## Development flow

Here are the steps of the process you need to follow in order to integrate new code or a new feature into the project:

1. Transition the status of the card that describes the feature you will be working on in your issue tracker.
1. Create a local branch to get started using git: `git checkout -b <feature|bug|enhancement|doc>/<issue-tracker-number>-<short-description>`. For instance, this could be a branch name: `feature/96-add-navigation-sidebar`.
    * The first part indicates whether it is new feature, bug or documentation, while the second part it is just the issue tracker card number followed by some short description.
1. Develop the new feature while doing atomic commits to your local branch using `git commit`.
1. After you are done, you might want to do a `git rebase develop` in case new changes were integrated, so your new commits are applied on top of that and you make sure everything still works.
1. Before creating the Pull Request, you need to make sure the tests pass (`yarn test`).
1. Now you are ready to create a new Pull Request with your changes, but before, push your changes to origin using `git push -u origin <your-branch-name>`.
1. Your code should be reviewed, you can update the branch with new changes after you get some feedback.
1. After the Pull Request is approved, merge it using the UI on Github (you can also remove the branch directly from the same page, which is also convenient). Your code will land to the `develop` branch (and eventually deployed into the staging environment).
1. Finally, remember to transition your issue tracker card to `Done`.

## CSS preprocessor

This project implements [SASS](http://sass-lang.com/) via [node-sass](https://github.com/sass/node-sass), as per the suggestion of [Create React App's documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-sass-stylesheet).

The styles for each component are therefore located in their corresponding `<component_name>.scss` file.

There's also a utility folder under `src/styles`. The folder contains some common variables, mixins and other stuff that is meant to be reused from other SASS files. You import these styles from another .scss file by doing:

```css
@import 'styles/_shared.scss';
```

### BEM convention

The components try to follow a [BEM](https://css-tricks.com/bem-101/) naming convention (Block Element Modifier). Hence, you can leverage the & (ampersand) operator in SASS to reference the parent component in a concise way.

```html
<a class="Button Button--big Button--orange">
  <span class="Button__price">$9.99</span>
  <span class="Button__text">Subscribe</span>
</a>
```

you can then write your styles as:

```CSS
.Button {
  &__price {
    text-align: right;
  }

  &__text {
    font-weight: bold;
  }

  &--big {
    font-size: 24px;
  }

  &--orange {
    color: darkorange;
  }
}
```

### Post processing

This project setup minifies your CSS and adds vendor prefixes to it automatically through [Autoprefixer](https://github.com/postcss/autoprefixer) so you don’t need to worry about it. That means, you don't need to add `-webkit-`, `-ms-` (or any other) prefixes on the css properties in the codebase.

### Flexbox

\[add notes about flexbox usage and if you use any library with helper classes\]

## Linter

In order to lint the code, the project uses [ESLint](https://eslint.org/), which is provided by [Create React App](https://github.com/facebook/create-react-app).

If you want to run the linter just type:
```bash
yarn lint
```

It's also convenient to integrate the linter warnings into your code editor, there are many plugins available for ESLint depending on your text editor used.

## Testing

The testing strategy for this project is based on the following two libraries:

* [react-testing-library](https://github.com/kentcdodds/react-testing-library): these are some testing utilities that allow you to write tests that work with actual DOM nodes. You can think of it as a replacement of the popular [Enzyme](https://github.com/airbnb/enzyme) testing library.
* [Jest](https://jestjs.io/): test runner developed by Facebook, it ships with `create-react-app`. It is also used to mock some of the modules that are required on the tests.

The main principle behind the testing philosophy of this approach is:
> The more your tests resemble the way your software is used, the more confidence they can give you.

Hence, the idea is to code tests that mimic the interaction of actual users with the UI components, in order for us to provide a confidence level that can allow us to ship the app without any key parts broken. Having that said, we can, in addition to integration tests, write unit tests for the different UI components when we consider this necessary.

You'll notice the test files are located within tests folders named `__tests__` in our codebase. Jest will automatically run any tests found on this folder, so in order to create a new test just add a new file inside.

You can write unit and integration tests with this approach. If you want to unit test a high level component you'll need to mock some dependencies, because `react-testing-library` intentionally **does not support** shallow rendering.

In case you want to do basic [snapshot testing](https://jestjs.io/docs/en/snapshot-testing), this is also supported, e.g.:

```javascript
expect(container.firstChild).toMatchSnapshot()
```

### How to run tests

To start watch mode, just do:

```bash
yarn test
```

It is suggested that you keep your terminal opened while in watch mode. As you edit your code, your tests will be automatically re-run. Look at the terminal for more instructions on the watch mode usage.

### Debugging tests

There's a pretty cool feature that you can use to debug the rendered component. The `render()` function from `react-testing-library` provides a `debug()` function in the object that is returned.

```javascript
import React from 'react'
import {render} from 'react-testing-library'

const HelloWorld = () => <h1>Hello World</h1>

it('renders correctly', () => {  
  const {debug} = render(<HelloWorld />)
  debug()
})
```

And then you'll see the rendered element on the console.

## Routes

This project is using [`react-router-dom v4`](https://reacttraining.com/react-router/core), have a look at `Routes.jsx` which is the file that defines the routes that are available.

There are several routes to navigate to different pages of the app:

\[describe your routes here\]

## State management

\[describe whether you use Redux, MobX, Unstated, Reflux, React Context or anything else to manage the state of the application\]

## CI/CD

\[describe your Continuous Integration/Continuous Delivery approach\]

## Deployment

\[describe your deployment strategy\]

### Test deployment

\[list here the url where your environments live\]

The `develop` branch deploys to http://my-app-staging.com.

The `master` branch deploys to http://my-app.com.

---

This app was bootstraped based on the template provided by [`create-react-app`](https://github.com/facebook/create-react-app)
