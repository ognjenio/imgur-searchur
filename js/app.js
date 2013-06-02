window.is = {}

window.is.generateVariations = function(){
  var word = $("#search").val();
  console.log(word);
}

$("#search").keyup(function(e){
  e.stopPropagation();
  e.preventDefault();
  if(e.which == 13) {
    window.is.generateVariations();
  }  
});
