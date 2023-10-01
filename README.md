# **Humanbenchmark clone**
A humanbenchmark clone website  built with React, Vite, Firebase, Tailwindcss and Typescript.
## Demo
The project is hosted on **vercel.com**. You can visit it by clicking [here](https://humanbenchmark-clone.vercel.app/).
## Project status
The project is currently in development. All tests are functional with the exception of the typing speed test. There's still a lot of detail work left such as smoothing animations and game flow.
## Features
- ### 8 different playable tests (1 still in development)
- ### Responsive design
    -  The website includes mobile, tablet and desktop version
- ### User functionality
    -  You can either play the games in "guest" mode, where your results are saved using the browser's localstorage, or you can register as a user and have your personal dashboard with all the results and statistics saved on the Firebase cloud storage.
- ### Statistics
    - Results from games can be saved,  creating a database which is used to create a chart with the results for each game. Those results can be useful to see how the average user performs or to see how you compare to the average user (percentiles are also calculated)
## Technologies used
- React using Vite - javascript framework / library
- Tailwindcss - CSS framework
- Firebase - for user functionality and storing results
- ChartJS - for creating the result charts
- Typescript - for type safety