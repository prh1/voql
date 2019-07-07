// https://en.oxforddictionaries.com/grammar/word-classes-or-parts-of-speech#conjunction

var command = {};

command.action = {
  select: ["show me", "tell me", "draw"],
  delete: [ "remove"]
}

command.quantity = {
  top: [ "top", "highest", "best", "most", "newest" ],
  bottom: [ "bottom", "lowest", "worst", "least", "oldest" ],
  all: [ "all", "every" ]
}

command.determiners = [ "a", "an", "the", "this", "for" ];

command.entity = { order: [ "order", "orders", "sale", "sales" ], people: ["people"], region: ["region"], price: ["price"], cost: ["cost"], margin: ["margin"] };

command.structure = [ { mandatory: "action"}, { optional: "quantity" }, { mandatory: "entity" } ];

var text = "show me the lowest 10 orders for the";
text = text + " ";
// work left to right along the text and work out which section each part belongs to
var pos = 0;

var sectionIdx = 0;
var parsed = {};

// is this section mandatory ?
for (var sectionIdx = 0; sectionIdx < 3; sectionIdx++) {
  var section = command.structure[sectionIdx];
  
  // Does anything match from this section?
  var cmd;
  var mandatory;
  var sectionName;
  var matched = false;

  if (section.mandatory != undefined) {
    sectionName = section.mandatory;
    cmd = command[section.mandatory];
    mandatory = true;
  } 
  if (section.optional != undefined) {
    sectionName = section.optional;
    cmd = command[section.optional];
    mandatory = false;
  } 

  console.log("Checking command", sectionName);
  parsed[sectionName] = {};

  for (type in cmd) {
    console.log("Checking for type", type, text);
    var phrases = cmd[type];
    for (var i = 0; i < phrases.length; i++) {
      var phrase = phrases[i];
      if (text.substr(0, phrase.length + 1) == phrase + " ") {
        console.log("Matched", phrase)
        parsed[sectionName] = type;
        text = text.substr(phrase.length + 1);
        matched = true;
      }
    }
  }  
 
  // If we haven't matched anything in this section check we haven't just got a determiner word here
  if (!matched) {
    var determiners = command.determiners;
    for (var i = 0; i < determiners.length; i++) {
      var determiner = determiners[i];
      if (text.substr(0, determiner.length + 1) == determiner + " ") {
        console.log("Determiner", determiner);
        text = text.substr(determiner.length + 1);
        // repeat the section
        sectionIdx--;
        matched = true;
      }
    }
  }


  if (!matched && mandatory) {
    console.log("*** Missing section", sectionName)
  }

}


console.log(parsed);
