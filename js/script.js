$(function() {

	var $compiled = $('#compiled'),
		$textarea = $('textarea'),
		parsed = null;

	// $textarea.val('Программа Метки фыфы12 1231 132 13 13 13:фыф12ы = 13 + 113; 13:фыфы = фыфы * 30 * (5+1);Конец программы')

	$('button').on('click', function() {
		$compiled.html('');
		var value = $textarea.val().replace(/\s+/g, ' ');


		try {
			parsed = parser.parse($textarea.val());
			$compiled.html( JSON.stringify(parser.memory) );
		} catch(err) {
			console.log(err)
			var z = unescape(err.message.replace(/\\u/g, '%u'));

			var str = '';
			if (err.found === ')') {
				str = 'Вы поставили лишнюю закрывающую скобку в операторе'
				$compiled.html(str ? str : z);
				return;
			} else if (err.found === '(') {
				str = 'Вы не поставили закрывающую скобку в операторе'
				$compiled.html(str ? str : z);
				return;
			}

	        switch (err.expected[0].description) {
	          case 'Программа':

	            str = 'Язык должен начинатьcя со слова "Программа"';
	            break;
	          case 'Метки':
	            str = 'Не найдено слово "Метки"';
	            break;
            	case '":"':
            		str = 'Вы неправильно написали метку'
            		if (err.found === ' ') {
            			str = 'Метка и знак двоеточия должны быть написано слитно';
            		}
	        }

	        if (err.expected[2] && err.expected[2].description === 'Метка') {
	        	str = 'вы неправильно написали метку в перечислении меток';
	        	if (err.found === ':') {
	        		str = 'Метка и знак двоеточия должны быть написано слитно';
	        	}
	        }


			$compiled.html(str ? str : z);
		}

	});

});