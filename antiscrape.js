/********** SET TO YOUR OWN *********/
window.seed_miaodhw90 = 192989300; // avoid too large numbers due to JS limits
window.seed_soaiqjw0s = 290898201; // change names (Control-F, many places referred to in file)
window.antiscrape_lifecount = 10;  // set to more or total of Antiscrape decryptions you expect. Set to false if infinite
//when counter hits zero, will delete seed numbers. another set of defense
// change the name of lifecount and change the name of Antiscrape to make things more hard
/************************************/
/************************************
By Mathew Pregasen, MIT License, free for everyone
3 Random Things:
1. T2 by Australia is some lit tea
2. Vic Mensa is going to be huge
3. Parsegon.com is awesome :)
Venmo me for tea if you like: Mathew-Pregasen
I'll return with a CSS / JS joke comment
************************************/

var Antiscrape = function(key, hardcore = false, superhardcore = false){
  this.key = Math.floor(key);
  this.alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"
  ,"o","p","q","r","s","t","u","v","w","x","y","z"];
  this.numbers = ["0","1","2","3","4","5","6","7","8","9"];
  this.hardcore = hardcore;
  this.superhardcore = superhardcore;
  if(superhardcore == true){
    this.hardcore = true;
  }
}
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};
Antiscrape.prototype = {
  findinStr: function(char, arr, caps){
    for(q = 0; q < arr.length; q++){
      if(caps == true){
        if(arr[q].toUpperCase() == char.toUpperCase()){
          return q;
        }
      }
      if(arr[q] == char){
        return q;
      }
    }
    return null;
  },
  encrypt : function(string, form, decrypt = false){
    if(decrypt == false && this.hardcore == true){
      window.seed_miaodhw90 = 3 * window.seed_miaodhw90 / 2;
      window.seed_soaiqjw0s = 3 * window.seed_soaiqjw0s / 2;
    }
    if(superhardcore == true && decrypt == false){
      window.seed_miaodhw90 = window.seed_miaodhw90 + 1280*string.length;
      window.seed_soaiqjw0s = window.seed_soaiqjw0s + 1560*string.length;
    }
    if(superhardcore == true && decrypt == true){
      window.seed_miaodhw90 = window.seed_miaodhw90 - 1280*string.length;
      window.seed_soaiqjw0s = window.seed_soaiqjw0s - 1560*string.length;
    }
    function onString(string, form, obj, decrypt = fakse){
      tot = obj.key + window.seed_miaodhw90^2;
      for(i = 0; i < string.length; i++){
        char = string.charAt(i);
        place = obj.findinStr(char, obj.alphabet, false);
        caps = false;
        if(place == null){
          caps = true;
          place = obj.findinStr(char, obj.alphabet, true);
        }
        if(place == null){continue};
        if(decrypt == true){
          place = (place - parseInt(tot.toString()
          .charAt(i%(tot.toString().length - 1))))
          .mod(25);
        } else {
          place = (place + parseInt(tot.toString()
          .charAt(i%(tot.toString().length - 1))))
          .mod(25);
        }
        string = string.replaceAt(i, obj.alphabet[place]);
        if(caps == true){string = string.replaceAt(i, string.charAt(i).toUpperCase())}
      }
      return string;
    }
    function onNumber(number, form, obj, decrypt = false){
      tot = obj.key + window.seed_soaiqjw0s^2;
      for(i = 0; i < string.length; i++){
        char = string.charAt(i);
        place = obj.findinStr(char, obj.numbers, false);
        if(place == null){continue};
        if(decrypt == true){
          place = (place - parseInt(tot.toString()
          .charAt(i%(tot.toString().length - 1))))
          .mod(10);
        } else {
          place = (place + parseInt(tot.toString()
          .charAt(i%(tot.toString().length - 1))))
          .mod(10);
        }
        string = string.replaceAt(i, obj.numbers[place]);
      }
      return string;
    }
    if(form == "string"){
      return onString(string, form, this, decrypt);
    }
    if(form == "number"){
      return onNumber(string, form, this, decrypt);
    }
    if(form == "email"){
      amp = string.indexOf("@", string);
      return onString(string.substring(0, amp), form, this, decrypt) + string.substring(amp);
    }
    if(form == "website"){
      ped = string.indexOf(".", string);
      return onString(string.substring(0, ped), form, this, decrypt) + string.substring(ped);
    }
  },
  decrypt : function(string, form, element = false){
    if(this.hardcore == true){
      window.seed_miaodhw90 = 2 * window.seed_miaodhw90 / 3;
      window.seed_soaiqjw0s = 2 * window.seed_soaiqjw0s / 3;
    }
    if(window.antiscrape_lifecount != false)
    { window.antiscrape_lifecount--; }
    if(element == true){
      str = document.querySelector(string).innerHTML;
      document.querySelector(string).innerHTML = this.encrypt(str, form, true);
      if(window.antiscrape_lifecount == 0){
        window.seed_miaodhw90 = 0;
        window.seed_soaiqjw0s = 0;
      }
      return true;
    }
    val = this.encrypt(string, form, true);
    if(window.antiscrape_lifecount == 0){
      window.seed_miaodhw90 = 0;
      window.seed_soaiqjw0s = 0;
    }
    return val;
  }
}
