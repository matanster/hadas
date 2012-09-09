# Hadas - the anti-IDE 

Takes care of your project reloading, once you change your code. Be agile.
It recycles both the node side and your open browser side, once your project changes (e.g. when you save or move a file).
An html user interface governs the enabling and disabling of this automatic recycling, as well as showing whether the project 
is running and serving its node console.

## Current setup effort summary:
Configuration parameters to set: 	2 - 5 <br/>
Moving around files:				2 <br/>
Code change to your project:		1 

## Setup

1. Download the code
2. Configure config/config.json to monitor your project 
3. In your project's client-side code directory, <br/> 
   copy the following files into /lib:
   `hadasClientListener.js`
   `socket.io.js`
4. In your project's html, add the following line, after jquery <br/>
   `<script type='text/javascript' src='./lib/hadasClientListener.js'></script>` <br/>
   It assumes your html first loads jquery

## Usage after setup

Start Hadas by locating to the root directory and run: `node hadas.js` (or on Windows, run hadas.bat) <br/>
The UI will then become available

## Stability status

This is work in progress. It works 'on my machine'.
It probably needs some fixing for Unix and non-Chrome.

## Welcome contributions

This is a user experience centric tool. <br/>
Any contribution must maintain a cool UI. <br/>
Post your ideas in the Wiki or fork / take away pieces.

## Inspiration and acknowledgements

This was inspired by a general disenchantment with how IDE's are designed. <br/>
I found no existing project doing this, so I made this. Lightly inspired by [Light Table] (http://www.chris-granger.com/2012/04/12/light-table---a-new-ide-concept/). The code was partly inspired by [Andrew Davey's vogue code] (https://github.com/andrewdavey/vogue). 

## License

Need to consolidate and confirm compliance with dependencies, prior to publishing.