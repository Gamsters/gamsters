# Gamsters

- Working demo: http://gamster.herokuapp.com/

## Setup

- Clone this repo

- Once you have opened the project inside the text editor of your choice, create a .env file on the root.
  Inside of this file, you will need to add the following:

  - PORT=3000
  - ENV=development
  - SESSION_SECRET= ///Here you can add any word of your choice///

  In case you want to use the google login, you will need to add and fill the followinf fields. You can find more information   on how to do so here https://developers.google.com/adwords/api/docs/guides/authentication
  - GOOGLE_CLIENT_ID=
  - GOOGLE_CLIENT_SECRET=

- Then, on your terminal, inside the project's folder, run:

  ```shell
  $ npm install
  $ npm run dev start
  ```

- Once all of the npm packages have been installed, run the following:

  ```shell
  $ npm run dev
  ```


Hamster loading gif by Martin Ollivere: https://dribbble.com/shots/4651504-Hamster-Loading-Spinner
Cute hamster images adapted from original imagery by AnnaliseArt: https://pixabay.com/illustrations/hamster-rodent-rat-mouse-animal-5369146/
