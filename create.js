#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require("commander");

program
  .version("0.0.1")
  .option("-k, --key", "Create Key based on passcode")
  .option("-c, --cipher", "Creates Cipher based on Key and Password")
  .option("-b, --both", "Creates Key and Cipher based on Passcode and Password")
  .parse(process.argv);


var crypto = require('crypto');
var key, cipher, encrypted;

if(program.key){
	if(program.args.length !== 1){
		console.log("DOOOD! I just need one passcode for a key");
		return;
	};
	key = crypto.createHash('md5').update(program.args[0]).digest('hex');
	console.log("KEY - %s", key);


} else if(program.cipher){
	if(program.args.length !== 2){
		console.log("DOOOD! I want both a key and a password for the cipher");
		return;
	};
	cipher = crypto.createCipher("aes256", program.args[0]);  
	encrypted = cipher.update(program.args[1], 'utf8', 'hex') + cipher.final('hex');
	console.log("CIPHER - %s", encrypted);


} else if(program.both){
	if(program.args.length !== 2){
		console.log("DOOOD! I want both a passcode and a password for the key and cipher");
		return;
	};
	key = crypto.createHash('md5').update(program.args[0]).digest('hex');
	cipher = crypto.createCipher("aes256", key);  
	encrypted = cipher.update(program.args[1], 'utf8', 'hex') + cipher.final('hex');
	console.log("KEY - %s  CIPHER - %s", key, encrypted);


} else {
	program.help();
};
