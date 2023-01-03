# Wordle with Score Database

This is an enhanced clone project (forked from [here](https://github.com/cwackerfuss/react-wordle)) of the popular word guessing game we all know and love. Made using React, Typescript, Tailwind, Node.js, Express, and Mongoose.

[**Try out the website!**](https://wordletemplate.herokuapp.com/)

[**YouTube video explaining my 15 variants**](https://www.youtube.com/watch?v=JyKkEyGwLP4) **(100k+ views!)**

[**YouTube video compacting the above video to 90 seconds**](https://www.youtube.com/watch?v=e8AO9OmSGe4) **(no commentary)**

## Steps to create a Wordle variant using this template

1. GitHub: Create an empty repository for the new game
2. Terminal: Clone this repository as an independent copy: [see below](#step-1-commands)
3. Terminal: Run `npm install`
4. [MongoDB Atlas](https://cloud.mongodb.com/): Create a new project and cluster under that project: [tutorial](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
5. [.env](.env): Set `MONGODB_URI` to the cluster URI
6. [Heroku Dashboard](https://dashboard.heroku.com/): Click `New` > `Create new app` to create app
7. Terminal: Follow `Deploy` instructions in [Heroku App Dashboard](https://dashboard.heroku.com/) to connect IDE terminal to app: [tutorial](https://devcenter.heroku.com/articles/git#create-a-heroku-remote)
8. [.env](.env): Update `REACT_APP_GAME_NAME`, `REACT_APP_GAME_DESCRIPTION`
9. [public/manifest.json](public/manifest.json): Update `name`, `short_name`
10. [src/services/scores.js](src/services/scores.js): Update `baseUrl`
11. [src/lib/share.ts](src/lib/share.ts): Update `gameUrl`
12. [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx): Update tutorial and GitHub link in InfoModal (JSX Element) 
13. [src/constants/](src/constants/): Update files
14. [Heroku App Dashboard](https://dashboard.heroku.com/): Under the settings tab, update the config vars `REACT_APP_GAME_NAME`, `REACT_APP_GAME_DESCRIPTION`, `MONGODB_URI`, `NODE_ENV=production`
15. Terminal: Commit files (except `MONGODB_URI` in .env file) and run `git push heroku main`

Advanced variant changes (such as adding a new language or new rules) will involve changing more components.

### Step 1 commands

[Original tutorial](https://handong1587.github.io/linux_study/2015/12/18/create-multi-forks.html)
```bash
git clone https://github.com/Compsciler/Wordle-With-Score-Database.git <game name>
cd <game name>
git remote -v
git remote rename origin upstream
git remote add origin <new remote GitHub URL>
git remote -v
git push -u origin main
```

### Generating new word lists based on existing word lists

1. Terminal: Run `cd wordlistgenerator`
2. (Optional) If using different word lists, use [arraytojsonfile.js](wordlistgenerator/arraytojsonfile.js) or another method to create json files of the word lists ([constants/combinedwordlist.json](wordlistgenerator/constants/combinedwordlist.json) is NYT list merged with roughly the first half of the word list currently in use)
3. [main.py](wordlistgenerator/main.py): Write `get_word_list()` function and optionally modify other properties of the file
4. Terminal: Run `python3 main.py` to get a JSON file of the new word lists
5. [src/constants/](src/constants/): Update [src/constants/wordlist.ts](src/constants/wordlist.ts) and [src/constants/validGuesses.ts](src/constants/validGuesses.ts) with the arrays from the new JSON files

### Validating words without valid guesses list

1. [src/constants/validGuesses.ts](src/constants/validGuesses.ts): Delete file
2. [src/constants/validChars.ts](src/constants/validChars.ts): Update `VALID_CHARS`
3. [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx): Uncomment `isValidKey()` function, `if (isValidKey(key))` block (and delete previous block), and `VALID_CHARS` import
4. [src/lib/words.ts](src/lib/words.ts): Uncomment `isWordInWordList` and `isValidWord` functions (and delete old `isWordInWordList` function), `isValidKey` import

### Syncing fork with changes to this repo

[Original tutorial](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)

Terminal:
1. Run `git fetch upstream`
2. If on separate branch, run `git checkout main`
3. Commit changes or run `git stash`
4. Run `git merge upstream/main` and resolve any merge conflicts
5. If ran `git stash` for Step 3, run `git stash pop`

If you only want to merge a specific upstream commit, for Step 4 instead run `git cherry-pick <commit hash> --no-commit`

### Creating a score database backup

After downloading and opening [MongoDB Compass](https://www.mongodb.com/products/compass):
1. Enter the URI of the MongoDB instance to connect to and click "Connect"
2. Click the Databases tab > `myFirstDatabase` > `scores`
3. Click the "Export Collection" icon and export the full collection and all fields to a JSON file (and enter output filename)

Backing up from the terminal (not tested): look into [mongodump](https://www.mongodb.com/docs/v4.2/reference/program/mongodump/) or [mongoexport](https://www.mongodb.com/docs/v4.2/reference/program/mongoexport/) here: [tutorial](https://www.youtube.com/playlist?list=PLC3y8-rFHvwh11bWtwm3_qKvo46uDmaal)

[MongoDB ObjectId to Timestamp Converter](https://steveridout.com/mongo-object-time/)

### Viewing basic score analytics

[MongoDB Atlas](https://cloud.mongodb.com/):

1. Click the Charts tab > "Explore Charts"
2. Click the Data Sources side tab > "Add Data Source", and add the collection from your cluster
3. Click the Dashboards side tab > "[Your Name]'s Dashboard" > "Add Chart"
4. Click "Choose a Data Source", and add your source
5. Customize your chart
    - Average score by word (treats loss as a score of the maximum number of guesses):
      - Chart Type: Column (Grouped)
      - X Axis: `solutionIndex`/`solution`
      - Y Axis: `guesses` (Array reductions: array length, Aggregate: mean)

### Using a link management platform

This game previously used [Rebrandly](https://www.rebrandly.com/) to create shareable links for each game. The source and destination URLs can be edited in case a game server becomes overloaded and a new game server URL is used. The Rebrandly link dashboard also displays link analytics. Note that support for custom domains and URL parameters requires additional fees.

## Build and run

### To run locally:

Clone the repository and perform the following command line actions:
#### Initial steps

```bash
cd Wordle-With-Score-Database
npm install
```

#### Running and testing

```bash
npm start
```
In a new terminal:
```bash
node ./src/server/index.js
```

### To build/run docker container:

#### Development

```bash
docker build -t reactle:dev -f docker/Dockerfile .
docker run -d -p 3000:3000 --name reactle-dev reactle:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
docker build --target=prod -t reactle:prod -f docker/Dockerfile .
docker run -d -p 80:8080  --name reactle-prod reactle:prod
```

Open [http://localhost](http://localhost) in browser. See the [entry in the FAQ](#why-does-sharing-of-results-not-work) below about requirements for sharing of results.

## My Wordle spinoff games

[Bigramle](https://github.com/Compsciler/Bigramle):
Words made of 2-letter bigrams

[Bigramle+](https://github.com/Compsciler/Bigramle-Plus):
Words made of 2-letter bigrams (but harder)

[Caesardle](https://github.com/Compsciler/Caesardle):
Caesar shifted words

[Codle](https://github.com/Compsciler/Codle):
Special-character heavy code

[Is That Even a Word? le](https://github.com/Compsciler/Is-That-Even-A-Wordle):
Words not in the NYT solution list

[Metalloidle](https://github.com/Compsciler/Metalloidle):
Words made using nonmetal and metalloid elemental symbols

[Notwordle](https://github.com/Compsciler/Notwordle):
Wordle with 5 very different hints

[Numerle](https://github.com/Compsciler/Numerle):
5-digit numbers, with a binary search aspect

[Phone Numble](https://github.com/Compsciler/Phone-Numble):
Phone numbers

[Repeatle](https://github.com/Compsciler/Repeatle):
Words with duplicate letters

[Subredditle](https://github.com/Compsciler/Subredditle):
Subreddits

[Usernamle](https://github.com/Compsciler/Usernamle):
Usernames

[Verticle](https://github.com/Compsciler/Verticle):
Vertical guessing mechanics

[Worwordle](https://github.com/Compsciler/Worwordle):
Fused words (e.g.: FRESH + SHEEP = FRESHEEP)

[Worwordle+](https://github.com/Compsciler/Worwordle-Plus):
Fused words (e.g.: SIREN + RENEW = SIRENEW)

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
- Update the "DatePicker" modal in [src/components/modals/DatePickerModal.tsx](src/components/modals/DatePickerModal.tsx)
- Update the statistics migration components modal in:
  - [src/components/stats/MigrationIntro.tsx](src/components/stats/MigrationIntro.tsx)
  - [src/components/stats/EmigratePanel.tsx](src/components/stats/EmigratePanel.tsx)
  - [src/components/stats/ImmigratePanel.tsx](src/components/stats/ImmigratePanel.tsx)
  - [src/components/modals/MigrateStatsModal.tsx](src/components/modals/MigrateStatsModal.tsx)
- To ensure that migration codes are unique to your application, update the Blowfish encryption key and initialization vector with random 30 character and 8 character strings in [src/constants/settings.ts](src/constants/settings.ts)
- If the language has letters that are not present in English update the keyboard in [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx)
- If the language is written right-to-left, prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in
  [src/lib/share.ts](src/lib/share.ts)
- To enable replaying past days' games, set `ENABLE_ARCHIVED_GAMES` to `true`
- Set `DATE_LOCALE` to a suitable locale string as defined in [date-fns](https://github.com/date-fns/date-fns/tree/main/src/locale).

### How can I add usage tracking?

This repository includes support for Google Analytics or [Plausible Analytics](https://plausible.io), but, by default, this is disabled.

To enable Google Analytics:

- Create a Google Analytics 4 property and obtain the measurement ID (of the format `G-XXXXXXXXXX`)
- In [.env](.env), add `REACT_APP_GOOGLE_MEASUREMENT_ID=G-XXXXXXXXXX`

Keep in mind that your region might have legislation about obtaining a user's consent before enabling trackers. This is up to downstream repos to implement.

To enable Plausible Analytics:

- Create a new website with Plausible Analytics with a given domain, e.g. `example.app`
- In [.env](.env), add `REACT_APP_PLAUSIBLE_DOMAIN=example.app`

### Why does sharing of results not work?

For mobile and wearable devices and smart TVs, sharing of results is initially attempted using the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API). For other devices or when sharing to the Web Share API fails, the results are written to the clipboard. Both these methods will succeed only in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), which require you to implement the HTTPS protocol when hosting this repo on a public domain.

## Projects built using this repo

### Other languages

- [Arwordle](https://arwordle.netlify.app/): Arabic
- [Boludle](https://www.boludle.com/): Argentinian
- [Gerdle](https://gerdle.vext.co.uk/): Cornish (Kernowek)
- [Jwordle](https://jwordle.vercel.app/): Japanese
- [Katadel](https://katadel.vercel.app/): Jawi (Malay Arabic script)
- [Keclap](https://keclap.xyz/): Sundanese
- [Kelmaly](https://kelmaly.com/): Arabic
- [Kerdle](https://kerdle.vercel.app/): Cornish/Kernewek (Standard Written Form)
- [Latindictionary.io](https://wordle.latindictionary.io/): Latin
- [Lexoula](https://lexoula.com/): Ελληνικά (Greek)
- [Malay](https://malay-wordle.netlify.app/): Bahasa Malaysia
- [Mondle](https://mondle.vercel.app/): Mongolian
- [Parig](https://www.parig.xyz/): Western Armenian
- [Parolette](https://parolette.netlify.app/): Italian
- [Parolle.it](https://parolle.it): Italian
- [Pashtoodle](https://pashtoodle.lingdocs.com): Pashto
- [Persian](https://www.persian-wordle.ir/): Persian (Farsi)
- [Persiga](https://www.persi.ga/): Portuguese
- [Pinyin](https://www.pinyindle.com/): Pinyin (romanization system for Mandarin Chinese)
- [Rudle](https://rudle.vercel.app): Russian
- [Sindhal](https://hellosindh.com/sindhal): Sindhi
- [Szózat](https://szozat.miklosdanka.com/): Hungarian
- [So'zzana](https://sozzana.netlify.app/): O'zbek (Lotin)
- [Tatar](https://tatardle.vercel.app/): Tatar (Turkic Language)
- [Tàu Tâi-gí (Taigi Wordle)](https://tau.taigi.info/): Taigi (Taiwanese)
- [Telugu](https://teluguwordle.com): Telugu (South Indian Language)
- [Tlembung](https://tlembung.vercel.app/): Javanese
- [Tugma](https://tugma.vercel.app): Hiligaynon (spoken in the Philippines)
- [Ukrainian](https://goroh.pp.ua/games/wordle): Ukrainian
- [Urdle](https://urdle.chaoticity.com/): Urdu
- [Vārdulis](https://wordle.lielakeda.lv/): Latvian
- [Wokle](https://wokle.njamed.com/): Bininj Kunwok
- [Word-leh!](https://word-leh.com): Singlish
- [Wordle (BOS)](https://elahmo.github.io/wordle/): Bosnian
- [Wordle (Spanish)](https://wordle-es.xavier.cc): Spanish/Espanol
- [Wordle-RO](https://wordle-ro.sirb.net/): Romanian
- [Wortel](https://wortel.wrintiewaar.co.za): Afrikaans
- [Wörtchen](https://woertchen.sofacoach.de): German
- [SGWordle](https://sgwordle.now.sh/): Swiss German
- [kelma.mt](https://kelma.mt): Maltese
- [Žodelė](https://zodele.lt): Lithuanian
- [Слівце](https://slivce.com/): Ukrainian
- [ਪੰਜਾਬੀ](https://punjabipuzzle.netlify.app/): Punjabi
- [சொல்லாடல் Soladle](https://omtamil.com/soladle): Tamil
- [字知之明](https://zedaizd.github.io/zh-char-puzzle/): Traditional Chinese
- [꼬들 - 한국어](https://belorin.github.io/): Korean
- [한글 풀어쓰기 5자](https://nakosung.github.io/wordle/): Korean
- [ไทย](https://buddhistuniversity.net/wordle-thai/): Thai
- [ಕನ್ನಡ](https://www.aksharabandha.co.in/): Kannada

### Fun themes

- [Airportle](https://airportle.scottscheapflights.com/): Airport Codes
- [Anidal](https://anidal-abrarhayat.web.app/): Animals
- [Birdle - Emojis](https://birdle.dev): Bird emojis
- [Birdle](https://www.creek-birdle.com/): Birds
- [Buildly](https://buildly.procurepro.co/): Construction themed
- [Crosswordle](https://crosswordle.mekoppe.com/): Crossword mashup
- [DALL-e-dle](https://dall-e-dle.vercel.app/): Provides a DALL-E generated image of the word as a clue
- [Dundle](https://dundle.dunmiffcord.com/): The Office
- [FFXIVrdle](https://ffxivrdle.com/): Final Fantasy XIV
- [Harry Potter](https://www.harrypotterwordle.com/): Harry Potter
- [JoJodle](https://jojo-news.com/fun/jojodle/): JoJo’s Bizarre Adventure
- [Mahjong Handle](https://mahjong-handle.update.sh/): Mahjong Hands
- [Filmle](https://filmle.now.sh/): Movie titles
- [Fletcherdle](https://www.fletcherdle.com/): American singer-songwriter FLETCHER
- [Lyricle](https://www.lyricle.app/): Lyrics
- [Midnightle](https://midnightle.flra.eu): Taylor Swift's Midnights album
- [Movie Wordle](https://movie-wordle.vercel.app): Bollywood
- [Murdle](https://murdle.vercel.app/): Spooky hangman mashup
- [Pawnle](https://pawnle.vercel.app/): Parks and Recreation
- [Poker Handle](https://kikychow.github.io/poker-wordle/): Poker
- [Poker Handle 2](https://poker-handle2.com/): Poker
- [Polygonle](https://www.polygonle.com/): Wordle with a shape-based clue for each character
- [Quettale](https://quettale.vercel.app/): Quenya, Elven language in LOTR
- [Radiole](https://radiole.vercel.app/): Radio-themed (for World Radio Day)
- [RareWordle](https://rwordle.vercel.app/): Word guessing with multiple simultaneous solutions of varying "values", all created from the same letters. The goal is to find the most obscure solution. It is inspired by the TV game show Pointless.
- [Reverdle](https://reverdle.now.sh/): Wordle but in reverse, that is one has to make as many guesses possible which do not have any green letter (i.e. a letter in the correct location compared to the hidden solution).
- [Spotle](https://spotlegame.co.uk): Wordle with an extra block, the incognito block
- [Squirdle](https://squirdle-inky.vercel.app/): Pokeman
- [Tacticle](https://tacticle.co/): Chess puzzles
- [Taylordle](https://www.taylordle.com/): Taylor Swift
- [Trekle](https://treklegame.com): Star Trek
- [Weedel](https://meetmeinouter.space/wordle/): Video game characters
- [Wordle.cl](https://www.wordle.cl): Chilean modisms, cities, places
- [Wrdl](https://wrdl-abae.vercel.app/): Words that are 5 letters long after getting rid of their vowels
- [WROUD](https://www.wroud.net/): W R O U D is a simple word game that challenges people to find a six-letter word in 3 guesses from a cloud of letters.
- [香港麻雀 糊 dle](https://hkwudle.vercel.app/): Mahjong hands under Hong Kong rules

### Fun themes in other languages
- [German Harry Potter Wordle](https://hpwordle.de)
- [Spotle](https://spotlegame.co.uk/portuguese): Spotle, but in Portuguese

### Math, Acronyms, Science, Tech, and more

- [AI-powered](https://github.com/asirota/wordle-ai): Includes an AI component
- [Biordle](https://biordle.grenteam.com): Biology
- [Colordle](https://github.com/necropolina/colordle): Guess the hexadecimal color code of the background
- [Genel](https://andrewholding.github.io/gene-wordle/): Gene symbols
- [Jazle](https://jazle.quest/): Javascript
- [Mathler](https://www.mathler.com/): Find the solution that equals X
- [Morsel](https://plingbang.github.io/morsel/): Morse
- [Numble](https://rbrignall.github.io/numble/): Maths
- [Opsle](https://opsle.vercel.app/): Ops
- [Passwordle](https://passwordle.sp8c3.com/): Passwords
- [Perfdle](https://perfdle.com): Performance Testers and Engineers, DevOps, and Observability
- [Primel](https://converged.yt/primel/): Prime numbers
- [Qwordle](https://qwordle.bhat.ca/): Quantum version of Wordle (uses entangled word-pairs)
- [Quantle](https://deduckproject.github.io/quantle/): Another quantum variant where guesses are quantum equations
- [Rundle](https://furstenheim.github.io/react-wordle/): Like wordle, but only last three guesses are considered.
- [Stockle](https://stockle.win/): Guess the stock or ETF
- [Syscordle](https://nezza.github.io/syscordle/): SYSCALL
- [TwoKinds](https://twokinds.me): There's only two kinds of people in this World.
- [UNLOCOdle](https://unlocodle.collabital.com/): UNLOCODEs
- [Visionle](https://orisenbazuru.github.io/visionle/): Guess the label of randomly chosen image from ImageNet/ImageNet-Sketch dataset (Machine learning)
- [Zip-zap-bam!](https://aneets.github.io/zip-zap-bam/): Word ladder game.
- [0xdle](https://0xdle.vercel.app/): Hexadecimal

_Want to add one to the list? Please make a pull request._
