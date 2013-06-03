window.is = {}

window.is.numberSubs = {
	i: 1,
	l: 1,
	e: 3,
	a: 4,
	s: 5,
	g: 6,
	t: 7,
	b: 8,
	o: 0
}

window.is.generateVariations = function(){
  var word = $("#search").val();
  if (word.length >= 4)
	{  
		variations = []
		
		variations.push(window.is.wordVariations(word));
		variations = _.uniq(_.flatten(variations));
		
		variations.push(window.is.numberSubVariations());
		variations = _.uniq(_.flatten(variations));
		
		console.log(variations);
	}
	else
	{
		alert("The search should be at least 6 characters.");
	}
}

window.is.wordVariations = function(word){
	if (word.length < 2)
	{
		return [word[0].toUpperCase(), word[0].toLowerCase()];
	}
	else
	{
		var to_ret = []
		var nextSegment = word.substring(1, word.length)
		var subVariations = window.is.wordVariations(nextSegment);
		
		for (var i = 0; i < subVariations.length; i++)
		{
			to_ret.push(word[0].toUpperCase() + subVariations[i]);
			to_ret.push(word[0].toLowerCase() + subVariations[i]);
		}
		return to_ret;
	}
}

window.is.numberSubVariations = function(){
	var to_ret = [];
	for (var i = 0; i < variations.length; i++)
	{
		to_ret.push(window.is.numberVariations(variations[i]));
	}
	to_ret = _.uniq(_.flatten(to_ret));
	variations.push(to_ret);
}

window.is.numberVariations = function(seg){
	if (seg.length < 2) 
	{
		if (window.is.numberSubs[seg] != null)
		{
			return [seg, window.is.numberSubs[seg]];
		}
		else
		{
			return [seg];
		}
	}
	else
	{
		var to_ret = []
		var nextSegment = seg.substring(1, seg.length)
		var subVariations = window.is.numberVariations(nextSegment);
		
		for (var i = 0; i < subVariations.length; i++)
		{
			to_ret.push(seg[0] + subVariations[i]);
			if (window.is.numberSubs[seg] != null)
			{
				to_ret.push(window.is.numberSubs[seg] + subVariations[i]);
			}	
			
		}
		return to_ret;
	}
}

var variations = []

$("#search").keyup(function(e){
  e.stopPropagation();
  e.preventDefault();
  if(e.which == 13) {
    window.is.generateVariations();
  }  
});
