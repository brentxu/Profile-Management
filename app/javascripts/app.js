// Import jquery
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
// Import bootstrap
import "bootstrap";
// Import the scss for full app (webpack will package it)
import "../stylesheets/app.scss";
// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import user_artifacts from '../../build/contracts/User.json';

var User = contract(user_artifacts);
var accounts;
var account;

window.App = {
    start: function() {
        var self = this;
        web3.eth.getAccounts(function(err, accs) {
            // set the provider for the User abstraction 
            User.setProvider(web3.currentProvider);
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            accounts = accs;
            account = accounts[0];

            // show current address
            var ethAddressIput = $('#sign-up-eth-address').val(accounts[0]);
            User.deployed().then(function(contractInstance) {
                var result = contractInstance.getUserByAddress(accounts[0], {gas: 200000, from: web3.eth.accounts[0]});
                result.then(function(value) {
                    console.log(value);
                })
            });
            // trigger create user when sign up is clicked
            var signUpButton = $('#sign-up-button').click(function() {
                self.createUser();
                return false;
            });
        });
    },
    createUser: function() {
        var username = $('#sign-up-username').val();
        var title = $('#sign-up-title').val();
        var intro = $('#sign-up-intro').val();

        User.deployed().then(function(contractInstance) {
            contractInstance.createUser(username, title, intro, {
                    gas: 200000,
                    from: web3.eth.accounts[0]
                })
                .then(function(success) {
                    if (success) {
                        console.log('created user on ethereum!');
                    } else {
                        console.log('error creating user on ethereum');
                    }
                })
                .catch(function(e) {
                    // There was an error! Handle it.
                    console.log('error creating user:', username, ':', e);
                });
        });
    }
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source.");
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Please use MetaMask or Mist browser.");
    }
    App.start();

});