window.seed_miaodhw90 = 192989300;
window.seed_soaiqjw0s = 290898201;
window.antiscrape_lifecount = 10;

var Antiscrape = function(key){
  this.key = Math.floor(key);
  this.alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"
  ,"o","p","q","r","s","t","u","v","w","x","y","z"];
  this.numbers = ["0","1","2","3","4","5","6","7","8","9"];
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
          place = (place - parseInt(tot.toString().charAt(i%(tot.toString().length - 1)))).mod(25);
        } else {
          place = (place + parseInt(tot.toString().charAt(i%(tot.toString().length - 1)))).mod(25);
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
          place = (place - parseInt(tot.toString().charAt(i%(tot.toString().length - 1)))).mod(10);
        } else {
          place = (place + parseInt(tot.toString().charAt(i%(tot.toString().length - 1)))).mod(10);
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
    window.antiscrape_lifecount--;
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
