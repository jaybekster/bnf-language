$(function() {

	var $compiled = $('#compiled'),
		$textarea = $('textarea'),
		parsed = null;

	// $textarea.val('Программа Метки фыфы12 1231 132 13 13 13:фыф12ы = 13 + 113; 13:фыфы = фыфы * 30 * (5+1);Конец программы')

	$('#help').on('click', function() {
		$(this).toggleClass('opened');
	})

	$('button').on('click', function() {
		$compiled.html('');
		// var value = $textarea.val().replace(/\s+/g, ' ');
		var value = $textarea.val(),
			i;

		for (i in parser.memory) {
			if (parser.memory.hasOwnProperty(i)) delete parser.memory[i];
		}

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
					str = 'Программа должна начинатьcя со слова "Программа"';
					break;
				case 'Метки':
					str = 'Не найдено слово "Метки"';
					break;
		    	case '":"':
		    		str = 'Вы неправильно написали метку'
		    		if (err.found === ' ') {
		    			str = 'Метка и знак двоеточия должны быть написано слитно';
		    		}
	    			break;
    			case 'Variable':
    				if (value.substr(err.offset -1, 1) === ':' && value.substr(err.offset, 1) === ' ') {
    					str = 'Метка и знак двоеточия должны быть написано слитно';
    				} else {
    					str = 'Неправильно написана метка';
    				}
    				break;
				case 'end of input':
					str = 'После выражения "Конец программы" не должно ничего следовать';

	        }

        	if (err.expected[0].value === 'Конец программы') {
    			str = 'Программа должна оканчиваться выражение "Конец программы"';
        	} else if (err.expected[0].value === ';') {
    			str = 'Не найден символ ";"';
    			if (/\d*/.test(value.substr(err.offset -1, 1))) {
    				str = 'Неправильное написание цисла: в нём не может находится нечисловой символ';
    			}
    			if (['-', '+', '*', '/', '^', '(', ')'].indexOf(err.found) !== -1) {
					str = 'Переменная должна начинаться с символа кириллического алфавита';
					if ( getNextSymbol(value, err.offset+1) === '(' ) {
						str = 'Мудила, скобку то закрой или убери к хуям';
					}
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

	function getNextSymbol(string, index) {
		var string = string.substr(index);
		if (!string) {
			return false;
		}
		if (string[0] == " ") {
			return getNextSymbol(string, 1);
		} else {
			return string[0];
		}
	}

});