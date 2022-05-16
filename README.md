# Wordle with Score Database

This is an enhanced clone project (forked from [here](https://github.com/cwackerfuss/react-wordle)) of the popular word guessing game we all know and love. Made using React, Typescript, Tailwind, Node.js, Express, and Mongoose.

[**Try out the demo!**](https://wordle-with-score-database.herokuapp.com/)

## Steps to create a Wordle variant using this template

1. Clone this repository as an independent copy: [tutorial](https://handong1587.github.io/linux_study/2015/12/18/create-multi-forks.html)
2. [MongoDB Atlas](https://cloud.mongodb.com/): Create a new project and cluster under that project: [tutorial](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
3. [.env](.env): Set `MONGODB_URI` to the cluster URI
4. [Heroku Dashboard](https://dashboard.heroku.com/): Click `New` > `Create new app` to create app
5. Terminal: Follow `Deploy` instructions in [Heroku App Dashboard](https://dashboard.heroku.com/) to connect IDE terminal to app: [tutorial](https://devcenter.heroku.com/articles/git#create-a-heroku-remote)
6. [.env](.env): Update `REACT_APP_GAME_NAME`, `REACT_APP_GAME_DESCRIPTION`
7. [public/manifest.json](public/manifest.json): Update `name`, `short_name`
8. [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx): Update tutorial in InfoModal (JSX Element) 
9. [src/constants/](src/constants/): Update files
10. [Heroku App Dashboard](https://dashboard.heroku.com/): Under the settings tab, update the config vars `REACT_APP_GAME_NAME`, `REACT_APP_GAME_DESCRIPTION`, `MONGODB_URI`, `NODE_ENV=production`
11. Terminal: Commit files and run `git push heroku main`

Advanced variant changes (such as adding a new language or new rules) will involve changing more components.

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd Wordle-With-Score-Database
$> npm install
$> npm run start
```

### To build/run docker container:

#### Development

```bash
$> docker build -t reactle:dev -f docker/Dockerfile .
$> docker run -d -p 3000:3000 --name reactle-dev reactle:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t reactle:prod -f docker/Dockerfile .
$> docker run -d -p 80:8080  --name reactle-prod reactle:prod
```

Open [http://localhost](http://localhost) in browser.


## FAQ

### How can I change the length of a guess?

The default configuration is for solutions and guesses of length five, but it is flexible enough to handle other lengths, even variable lengths each day.

To configure for a different constant length:

- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to only include words of the new length.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to only include words of the new length.

To configure for variable lengths:

- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to include words of any of the variable lengths desired.
- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to include words of any of the variable lengths desired.

Note that guesses are validated against both the length of the solution, and presence in VALID_GUESSES.

### How can I create a version in another language?

- In [.env](.env):
  - Update the title and the description
  - Set the `REACT_APP_LOCALE_STRING` to your locale
- In [public/index.html](public/index.html):
  - Update the "You need to enable JavaScript" message
  - Update the language attribute in the HTML tag
  - If the language is written right-to-left, add `dir="rtl"` to the HTML tag
- Update the name and short name in [public/manifest.json](public/manifest.json)
- Update the strings in [src/constants/strings.ts](src/constants/strings.ts)
- Add all of the five letter words in the language to [src/constants/validGuesses.ts](src/constants/validGuesses.ts), replacing the English words
- Add a list of goal words in the language to [src/constants/wordlist.ts](src/constants/wordlist.ts), replacing the English words
- Update the "Settings" modal in [src/components/modals/SettingsModal.tsx](src/components/modals/SettingsModal.tsx)
- Update the "Info" modal in [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx)
- If the language has letters that are not present in English update the keyboard in [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx)
- If the language is written right-to-left, prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in [src/lib/share.ts](src/lib/share.ts)

### How can I add usage tracking?

This repository includes support for Google Analytics or [Plausible Analytics](https://plausible.io), but, by default, this is disabled.

To enable Google Analytics:

- Create a Google Analytics 4 property and obtain the measurement ID (of the format `G-XXXXXXXXXX`)
- In [.env](.env), add `REACT_APP_GOOGLE_MEASUREMENT_ID=G-XXXXXXXXXX`

Keep in mind that your region might have legislation about obtaining a user's consent before enabling trackers. This is up to downstream repos to implement.

To enable Plausible Analytics:

- Create a new website with Plausible Analytics with a given domain, e.g. `example.app`
- In [.env](.env), add `REACT_APP_PLAUSIBLE_DOMAIN=example.app`
