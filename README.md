##antiscrape.js

![](antiscrape.png)

A lightweight, easy Javascript file to protect your email and phone number from simple to moderately advanced web scrapers. 
While it is nearly impossible to 100% protect your website from scrapers, although strong protection could be created
using server honeypots or more involved access rules, this Javascript file is a simple approach to give a small, albeit
decent layer of protection to your content. While scrapers could hypothetically run the file in a simulator and attain 
your information (so please note, this is not nearly 100% protective), such process is more expensive, and therefore 
less likely to touch your website. 

####What does antiscrape do? 

Antiscrape creates a moving alias map (i.e., a key that shifts per character iteration) that smartly transposes dummy data 
to real data after the javascript processes on your website. Antiscrape allows you to locally create aliases that are 
reversed using Antiscrape's decrypt, but also maintains form to fool scrapers into thinking they hit jackpot. 

**Need an example?**
To a scraper, this looks legit: 
`sioajksl@gmail.com` namely with the recognized domain name. 

Antiscrape maintains the email form, and the more generic domain name, to emphasize the likelihood that such email address
is the real one, and the job is done.  The same is provided for general strings and numbers, including phone numbers. 

The process involves running your Antiscrape file with your preset seeds locally to attain the encrypted data, and then using the encrypted data in your raw HTML, expecting Antiscrape to decrypt it on load. 

##Getting started

The first thing you should do is change a lot of names. While this library is completely unknown, if a web scraper takes note and writes a counter function to its method, the best line of defense is mucking up the names to add more complexity overhead.

At the top of the antiscrape.js file, you see the following: 

```js
window.seed_miaodhw90 = 192989300;
window.seed_soaiqjw0s = 290898201; 
window.antiscrape_lifecount = false; 
```
Set the two seeds to numbers of similar size, but different in value. You don't need to remember the values. However, change
the name of the slug of both, ie "miaodhw90", using Control-F since they are used throughout the file. 

*window.antiscrape_lifecount* is on default set to false. If you know how many items you are going to decrypt on the site, 
set this to that number. It will clear the seed's data after all the decryption is done, adding a tiny other matter of complexity to halt either your processes or retract the seed's data from the raw HTML.  When set to false, this variable doesn't matter

##Include the file

Include the file like any other Javascript file using a script tag, ie <script src="path/to/antiscrape.js"></script>

##Create an antiscrape object with a seed

Using a single antiscrape object is sensible, however, you are free to use many. An object is created with a seed as the first
parameter, which indicates that your personal input into a function is relevant, and a scraper cannot just parse a DOM tree
to father the data. 

For instance: 
```
igotthekeys = new Antiscrape(42);
```

##On your local branch, figure out alias value.
To churn out the alias, input the string and the form. Ie:

```
console.log(igotthekeys.encrypt("mathexl@gmail.com", "email")); // prints out njvqhxn@gmail.com on my settings
```
There are four forms, `string`, `number`, `website`, `email`; Number refers to a string that is numerical typically in format,
ie, phone number. This is to maintain proper form. Website inputs will maintain the same slug but not URL. Email inputs will 
maintain the domain and @ symbol, only changing the user name. 

##Replace the static value with your alias.
Replace the static value with your alias in your email. For instance, you may do:
```HTML
<p>Contact Me!</p>
<div class="email">njvqhxn@gmail.com</div>
```

This is bait for the web scraper. 

##Add the dynamic decrypt command

Add Javascript into the file to automatically convert it on page-load for a normal user. This can be done in two ways. A raw
string conversion for whatever your framework's needs can be found by simply calling decrypt on the string. This implies you
feed the string through Javascript. Ie: 

```JS
realemail = igotthekeys.decrypt("njvqhxn@gmail.com", "email");
```
Or, you could more easily decrypt in the DOM's place by setting the third paramter to true and feeding in a selector:
```JS
igotthekeys.decrypt(".email", "email", true);
```
This will replace the HTML in place. 

Keep in mind that you must use an antiscrape object with the same seed to encrypt and decrypt.

##Hardcore Mode

Hardcore mode adds an extra lace of protection by only allowing the correct values to be reached when they are decrypted in a 
proper order. This takes a little, but not too much, extra care on your part, and is easily set up. First, initiate an 
antiscrape object with the hardcore parameter (parameter two) to true: 

```
djKhaled = new Antiscrape(42, true);
```

Then, follow the same steps involving encrypting files. However, there are two caveats: 

1) The values of the aliases must be calculated in a single local Javascript test, as the # of antiscrape calls make a difference. 
2) The calls to decrypt the DOM must also be done in the same order they were originally called. 

##Super Hardcore Mode

I think this is personally a bit overkill, but a shortcoming of the last approach is that if you had aliases A, B, C, then
if a scraper, somehow, tried to reverse them in the order of B, A, C, they would still succeed on C since two calls existed before it. Therefore, super hardcore mode adds an extra variance of the variables based on the size of the strings. However, 
the major shortcoming of this approach is that if you change the formatting of your values in *any way* then you will need to 
redo the aliases. Keep that in mind. In order to enable this mode, just use two true bools when declaring the antiscrape obj.

```
locksmith = new Antiscrape(42, true, true);
```
