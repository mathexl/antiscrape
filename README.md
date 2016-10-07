##antiscrape.js

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
