# Yandex pixel perfect homepage clone (nc_education_2k21)

## Discription

Learning task. Pixel perfect [yandex](https://yandex.ru/) homepage clone.   
  
Demo:  
1. [Github pages](https://taratatuy.github.io/yandex-clone-pp/)
2. [Heroku](https://yandex-homepage-clone.herokuapp.com/)

### Task 1

Create pixel perfect clone.

### Task 2

Add infinite scroll to zen area.  
For this i added some js files.  
**Zen.js** contains functions to manipulate with Zen block on the page. It is implementing `Block` interface so contain `addElement` function.  
  
**ScrollListener.js** is just a page scrolling listener. Simple `Observer pattern` that allows other classes to subscribe to updates that it emits on scroll. You can set minimal timeout between events.  
  
**API.js** is a class that emulate real responses from server. It contain two methods: 
1. One is real fetch to heroku server.  
2. Second is fake emulation via promise and timeout. You can set here any latency you want.  

Both of this methods return fake data with hard code params.  
  
**ContentLoader.js** is a class that contain logic for request and append content to the page. It take any class implements `IBlock` interface as argument so this Dependency Injection determinate paste place. Callable method check if scroll are close to the end of the page then it call an API method. Method that calls API set its own timeout flag and wait for responce. Once all responces are here ContentLoader call `IBlock` class and release flag.

 
## Installation

```
npm i 
npm run start:dev
``` 

