# Gamsters

Receive a randomized board game reccomendation based on input filters. After sign-up, the user will be able to add these games to their list, and use a search bar to look for new board games by name.

![Screenshot 2021-01-13 at 13 08 06](https://user-images.githubusercontent.com/42493985/104458006-0d8c5000-55ab-11eb-819b-978f11df5f00.png)

- Working demo: http://gamster.herokuapp.com/

## Setup

- Clone this repo

- Once you have opened the project inside the text editor of your choice, create a <b>.env</b> file on the root.
  Inside of this file, you will need to add the following:
  ```shell
  - PORT=3000
  - ENV=development
  - SESSION_SECRET= ///Here you can add any word of your choice///
  ```

  In case you want to use the google login, you will need to add and fill the following fields. You can find more information   on how to do so here https://developers.google.com/adwords/api/docs/guides/authentication

  ```shell
  - GOOGLE_CLIENT_ID=
  - GOOGLE_CLIENT_SECRET=
  ```

- Then, on your terminal, inside the project's folder, run:

  ```shell
  $ npm install
  $ npm run dev start
  ```

- Once all of the npm packages have been installed, run the following:

  ```shell
  $ npm run dev
  ```

## Built with

- <a href='https://www.boardgameatlas.com/'>Board Game Atlas API</a>

## Authors

- <a href='https://github.com/kgracey93'>Katie Gracey</a>
- <a href='https://github.com/jan-webdev'>Jan Völker</a>
- <a href='https://github.com/prullansky'>ale rodriguez</a>


## Acknowledgments

- Hamster loading gif by <a href='https://dribbble.com/shots/4651504-Hamster-Loading-Spinner'>Martin Ollivere</a>.
- Cute hamster images adapted from original imagery by <a href='https://pixabay.com/illustrations/hamster-rodent-rat-mouse-animal-5369146/'>AnnaliseArt</a>.
