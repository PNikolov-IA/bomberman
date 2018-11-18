# Bomberman

    Inline-style: 
    ![logo](https://gitlab.com/ogonommo/bomberman/blob/938cd981d85c06723c06fe8fe0f31a278dccc9b7/public/assets/logo.png)

    Open source multiplayer game written in Typescript. 
    The project Bomberman is a browser-based game using Phaser objects but also a specially developed back-end and server logic.
    
    This project is composed of:

    * The Bomberman client is connected to a server
    * The Bomberman server runs the game
    * The cliend sends commands to the server and expect the server response and the game flow
    * The client may leave the game on any time by braking server connection


### Team name: S.P.I
* Team leader: _Stoyan Peshev_ [ogonommo](https://my.telerikacademy.com/Users/ogonommo)
* Team 1

### Team members:
* _Stoyan Peshev_ *[ogonommo](https://my.telerikacademy.com/Users/ogonommo)*
* _Iva Zhelyazkova_ *[ivairons](https://my.telerikacademy.com/Users/ivairons@gmail.com)*
* _Plamen Nikolov_ *[PNikolov](https://my.telerikacademy.com/Users/PNikolov)*

### Starting the game
1. Clone the repository

1. Install packages
    - **_npm install_**

1. Fix Phaser types
    - copy the content of the **_fix_** folder to **_/node_modules/phaser/src_**

1. The main.ts is the entry of the project (server)

1. There are a few commands you can use (only one working at the time)
    - **_npm start_** - this will build and run the project
    - **_npm test_** - this will run the unit tests
  

### Basics

*    The rules are similar to the old school game rules: *[bomberman](https://en.wikipedia.org/wiki/Bomberman)*
    
### 1. Controlls

    Use your movement WASD keys to move and space (action) key to place a bomb.

### 2. Multiplayer Specific 

    Multiplayer mode is limmited up to 4 players simultaniously in one room.  
    A player is a generated Phaser hero animation... with fancy style and fast movement.
    The abilities of the bomberman-hero are limited for now but still includes multiple bombs and common firepower.

### 3. Maps

    Two possible varients of the map, each of them have a specific theme Space or Forest.
    Space/Forest - Plain classic-style bomberman map including a destructible/indestructible Phaser objects. 
    A borders of the map are covered by trees, obscuring the view.

### 4. Enemies

    Needs to be implimented into the game.

### 5. Bombs

    Needs to be implimented into the game.
    
### Ongoing work and Testing

    Testing and debuging in the browser
    Implementation of additional features
    Allow map selection or random
    
### Stack

    NodeJS
    Typescript
    Socket.IO
    Phaser
    
### Other remarks: 
* Project menagament in *[trello.com](https://trello.com/b/5IWOe7aa/game)*
* Project reporters: @vesheff, @RosenUrkov and @StevenTsvetkov
    
### MIT License
 
Copyright (c) 2018 Stoyan Peshev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
