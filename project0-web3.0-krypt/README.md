# Krypt

![Krypt](krypt_preview.png)

This project is a step by step practise project following **[JavaScript Mastery](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&t=56s)**. If you want to do practising step by step to be familiar with React and Web3.0 dev, you may also recommand to watch this Video.

**Important Note**: Do not ever transfer any real ether to the address in this project and do not use this private key for your own use since it is not safe and just for test. 

### What you may Learn

* TailwindCSS
* React Hooks, espicially, state, effect, context hooks
* Solidity
* Hardhat
* Ethers


### Why I do this practise

I have started Front-end dev almost from 2017, but periodly give it up during part of my university time, thus, I want to get a quik reminder of some front-end dev stack.

### How to run it

* Simple way:
    1. In the client folder, run `npm install`; run `npm run dev` to start the server.
    2. In the browser, open `http://localhost:3000/`
* Advanced way:
    1. In the contracts folder: 
        1. open hardhat.config.js to set your url and private key
        2. run `npx hardhat run script/deploy.js" `
        3. get the conntract address
    2. In the client folder:
        1. open constants.js
        2. change the "contractAddress" to your own contratc address
    3. run as the simple way

