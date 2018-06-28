
module.exports = {
    // Function to validate string
    stringValidate(inputTxt) {
      var letterNumber = /^[A-Za-z]+$/;
      return isValidRegExpression(inputTxt, letterNumber)
    },
  
    // Function to validate alpha numeric
    alphaNumericValidate(inputTxt) {
      var letterNumber = /^[0-9a-zA-Z]+$/;
      return isValidRegExpression(inputTxt, letterNumber)
    },
  
    // Function to validate phone number
    phoneNumberValidate(inputTxt) {
      var phoneNo = /^\+?\)?[0-9]{2}\)?[-. ]?[0-9]{4}[-. ]?[0-9]{4}$/;
      return isValidRegExpression(inputTxt, phoneNo)
    },
  
    // Function to validate email
    emailValidate(inputTxt) {
      var letterNumber = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //var letterNumber = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
      return isValidRegExpression(inputTxt, letterNumber)
    }
  }
  
  function isValidRegExpression(_text, _regx) {
    // console.log("_text >", _text)
    //return _text.value.match(_regx);
    let _val = _regx.test(_text)
    // console.log("_val >", _val)
    return _val;
  }
  