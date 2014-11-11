$(function() {
	
	var $compiled = $('#compiled'),
		$textarea = $('textarea'),
		parsed = null;

	$textarea.val('Программа Метки фыфы12 1231 132 13 13 13:фыф12ы = 13 + 113; 13:фыфы = фыфы * 30 * (5+1);Конец программы')

	$('button').on('click', function() {
		$compiled.html('');
		parser.memory = {};

		try {
			parsed = parser.parse($textarea.val());
			$compiled.html( JSON.stringify(parser.memory) );	
		} catch(err) {
			console.log(err)
			var z = unescape(err.message.replace(/\\u/g, '%u'));
			$compiled.html(z);
		}
		
	});

});