# ASSET BUTTON

This assessment was done using [React](https://reactjs.org).

## Getting Started

Firstly, make sure you have nodejs (v18.12.0+) installed on your computer.\
You can check your system's node version by:

- Open your window terminal or bash terminal
- Type in the code below:

`node -v`

- If you don't have it installed, you can download it here [node](https://nodejs.org/en/download)

To download project to your computer, follow the steps below:

- Launch your bash terminal
- Then click [here](https://github/willhemz/dexla-assessment) to assess the repository.
- Click either the `HTTPS` button or `SSH` button. copy either the `HTTPS CODE` or `SSH CODE`.
- Proceed to your terminal. Go to the directory where you want the project stored.
- Type `git clone`, then paste either the `HTTPS CODE` or `SSH CODE`.\
  Then press `ENTER` key.
- After file is completely downloaded, switch to the project directory by typing:\
  `cd dexla-assessment`

In the project directory, you can run:

### `npm install`

Installs the node modules necessary for the project to launch successfully.

Once the node modules has been installed, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How it works

A loader displays onload as a GET request is made to the server using the FIGMA API link provided.

Upon successful request, the component renders as a `DIV`.

A click on the DIV COMPONENT render the component as a `BUTTON` and vice versa .

If one of the destructured item returns an Array instead of an object, the component renders as a `BUTTON` with a warning instruction displaying on screen for 5seconds.
