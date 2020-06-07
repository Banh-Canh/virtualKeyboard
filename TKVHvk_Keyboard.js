function TKVHvk_getKeyboardProperties()
{
	const TKVHvk_keyLayout = ['²','&','é','"',"'",'(','-','è','_','ç','à',')','=','a','z','e','r','t','y','u','i','o','p','^','$','q','s','d','f','g','h','j','k','l','m','ù','*','<','w','x','c','v','b','n',',',';',':','!'];	
	const TKVHvk_keyButtons = document.getElementsByClassName("TKVHvk_keyButton");
	const TKVHvk_upperKeyLayOut = ['²','1','2','3','4','5','6','7','8','9','0','°','+','A','Z','E','R','T','Y','U','I','O','P','¨','£','Q','S','D','F','G','H','J','K','L','M','%','µ','>','W','X','C','V','B','N','?','.','/','§'];	
	return [TKVHvk_keyLayout,TKVHvk_keyButtons,TKVHvk_upperKeyLayOut];
}

function TKVHvk_setDefaultKeys()
{
	const x = TKVHvk_getKeyboardProperties();		
		const y = x[0];	
		const z = x[1];		
		
	for (var i=0; i<z.length; i++) 
	{
		z[i].textContent = y[i];
	}
	console.log("default keys set");
}

function TKVHvk_detectInputTexts()
{
	var inputs = document.getElementsByTagName('input');
	var inputTexts = [];
	for(var i = 0; i < inputs.length; i++) 
	{
		if(inputs[i].type.toLowerCase() == 'text') 
		{
			inputTexts[i] = inputs[i];
		}
	}

	var textAreas = document.getElementsByTagName("textarea");
	var allTextInputs = [...inputTexts,...textAreas];

	for (var i=0; i<allTextInputs.length; i++) 
	{
		allTextInputs[i].addEventListener("focusin", TKVHvk_keyboardOpener);
		allTextInputs[i].addEventListener("focusout", TKVHvk_keyboardOpener);
	}
	console.log("input text detected");
}
	
function TKVHvk_createKeyboard()
{
	//create main element
	const TKVHvk_keyboard = document.createElement("div");
	const TKVHvk_keysContainer = document.createElement("div");
	
	//Setup main elements
	TKVHvk_keyboard.classList.add("TKVHvk_keyboard","TKVHvk_keyboardHidden");
	TKVHvk_keyboard.id = "TKVHvk_keyboard"
	TKVHvk_keysContainer.classList.add("TKVHvk_keysContainer");
	
	//Add to DOMContentLoaded
	TKVHvk_keyboard.appendChild(TKVHvk_keysContainer);
	document.body.appendChild(TKVHvk_keyboard);
	
	/////
	
	const TKVHvk_fragment = document.createDocumentFragment();
	const x = TKVHvk_getKeyboardProperties();
		const y = x[0];
		const z = x[1];
	
	y.forEach(key => 
	{
		const TKVHvk_keyElement = document.createElement("button");
		const TKVHvk_insertLineBreak = ["$"].indexOf(key) !== -1;
		const TKVHvk_insertBackSpace = ["="].indexOf(key) !== -1;
		const TKVHvk_insertEnterShift = ["*"].indexOf(key) !== -1;
		const TKVHvk_insertSpace = ["!"].indexOf(key) !== -1;
		
		//Add attributes/classes
		TKVHvk_keyElement.setAttribute("type","button");
		TKVHvk_keyElement.classList.add("TKVHvk_keyButton");
		TKVHvk_fragment.appendChild(TKVHvk_keyElement);
		
		if (TKVHvk_insertBackSpace)
		{
			const TKVHvk_backSpace = document.createElement("button")
			TKVHvk_fragment.appendChild(TKVHvk_backSpace);
			TKVHvk_backSpace.id = "TKVHvk_keyBackSpace";
			TKVHvk_backSpace.setAttribute("type","button");
			var TKVHvk_imgBackSpace = document.createElement("img");
			TKVHvk_backSpace.appendChild(TKVHvk_imgBackSpace);
			TKVHvk_imgBackSpace.src = 'images/backspace_white_192x192.png';
			TKVHvk_imgBackSpace.classList.add("TKVHvk_iconKeyboard");
			TKVHvk_fragment.appendChild(document.createElement("br"));
			
			console.log("backspace inserted");
		}
		
		if (TKVHvk_insertLineBreak)
		{
			TKVHvk_fragment.appendChild(document.createElement("br"))
			
			console.log("linebreak inserted");
		}
		
		if (TKVHvk_insertEnterShift)
		{	
			TKVHvk_fragment.appendChild(document.createElement("br"))
			const TKVHvk_shift = document.createElement("button")
			TKVHvk_fragment.appendChild(TKVHvk_shift)
			TKVHvk_shift.id = "TKVHvk_keyUpper"; 
			TKVHvk_shift.setAttribute("type","button");
			var TKVHvk_imgShift = document.createElement("img");
			TKVHvk_shift.appendChild(TKVHvk_imgShift);
			TKVHvk_imgShift.src = 'images/keyboard_capslock_white_192x192.png';
			TKVHvk_imgShift.classList.add("TKVHvk_iconKeyboard");
			
			console.log("shift inserted");
		}
		if (TKVHvk_insertSpace)
		{
			TKVHvk_fragment.appendChild(document.createElement("br"))
			const TKVHvk_space = document.createElement("button")
			TKVHvk_fragment.appendChild(TKVHvk_space)
			TKVHvk_space.id = "TKVHvk_keySpaceBar"; 	
			TKVHvk_space.setAttribute("type","button");
			var TKVHvk_imgSpace = document.createElement("img");
			TKVHvk_space.appendChild(TKVHvk_imgSpace);
			TKVHvk_imgSpace.src = 'images/space-bar.png';
			TKVHvk_imgSpace.classList.add("TKVHvk_iconKeyboard");
			console.log("space inserted");
		}
	})
	
	TKVHvk_keysContainer.appendChild(TKVHvk_fragment);
	TKVHvk_setDefaultKeys();
		
	TKVHvk_addCssFile('TKVHvk_Keyboard.css');
	
	document.getElementById("TKVHvk_keyBackSpace").addEventListener("mousedown", TKVHvk_keyErase);
	document.getElementById("TKVHvk_keyUpper").addEventListener("click", TKVHvk_keyShift);
	document.getElementById("TKVHvk_keySpaceBar").addEventListener("click", TKVHvk_keySpace);		
	document.getElementById("TKVHvk_keyboard").addEventListener("mousedown", function() {event.preventDefault()});
	
	
	TKVHvk_detectInputTexts();

	for (var i=0; i<z.length; i++) 
	{
		z[i].index = i;
		z[i].addEventListener("click", TKVHvk_keyWrite);
	}
	
}

function TKVHvk_keyWrite() 
{
	const x = TKVHvk_getKeyboardProperties();
		const y = x[0];
		const z = x[1];
		const a = x[2];
	
	var b = [...y];

	if(document.activeElement.tagName === "TEXTAREA" ||
		(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
	{
		if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
		{
			var TKVHvk_startPos = document.activeElement.selectionStart;
			var TKVHvk_endPos = document.activeElement.selectionEnd;
			if (document.getElementById("TKVHvk_keyUpper").classList.contains('TKVHvk_upperActive'))
			{	
				for (var i=1; i<z.length; i++) 
				{
					b[i] = a[i];
				}
			}
			document.activeElement.value = document.activeElement.value.substring(0, TKVHvk_startPos)
			+ b[this.index]
			+ document.activeElement.value.substring(TKVHvk_endPos, document.activeElement.value.length);
			document.activeElement.selectionStart = TKVHvk_startPos + b[this.index].length;
			document.activeElement.selectionEnd = TKVHvk_startPos + b[this.index].length;

		}
		else 
		{
			document.activeElement.value += b[this.index];
		}
	}	
}

function TKVHvk_keySpace() 
{
	if(document.activeElement.tagName === "TEXTAREA" ||
		(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
	{
		if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
		{
			var TKVHvk_startPos = document.activeElement.selectionStart;
			var TKVHvk_endPos = document.activeElement.selectionEnd;
			document.activeElement.value = document.activeElement.value.substring(0, TKVHvk_startPos)
			+ ' '
			+ document.activeElement.value.substring(TKVHvk_endPos, document.activeElement.value.length);
			document.activeElement.selectionStart = TKVHvk_startPos + ' '.length;
			document.activeElement.selectionEnd = TKVHvk_startPos + ' '.length;
		}
	}	
}

function TKVHvk_keyErase() 
{
	if(document.activeElement.tagName === "TEXTAREA" ||
		(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
	{
		if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
		{
			var TKVHvk_startPos = document.activeElement.selectionStart;
			var TKVHvk_endPos = document.activeElement.selectionEnd;
			var TKVHvk_firstpart = document.activeElement.value.substring(0, TKVHvk_startPos)
			document.activeElement.value = TKVHvk_firstpart.slice(0, TKVHvk_firstpart.length -1)
			+ document.activeElement.value.substring(TKVHvk_endPos, document.activeElement.value.length);
			document.activeElement.selectionStart = TKVHvk_startPos -1;
			document.activeElement.selectionEnd = TKVHvk_startPos -1;
		}
	}	
}

function TKVHvk_keyShift()
{
	const x = TKVHvk_getKeyboardProperties();
		const y = x[0];
		const z = x[1];
		const a = x[2];
	document.getElementById("TKVHvk_keyUpper").classList.toggle("TKVHvk_upperActive");
	if (document.getElementById("TKVHvk_keyUpper").classList.contains('TKVHvk_upperActive'))
	{
		for (var i=0; i<z.length; i++) 
		{
			z[i].textContent = a[i];
		}
	}
	else
	{
		TKVHvk_setDefaultKeys();
	}
}

function TKVHvk_keyboardOpener()
{
	document.getElementById("TKVHvk_keyboard").classList.toggle("TKVHvk_keyboardHidden");
}

window.addEventListener("DOMContentLoaded",TKVHvk_createKeyboard);

function TKVHvk_addCssFile(fileName) 
{

  var TKVHvk_head = document.head;
  var TKVHvk_link = document.createElement("link");

  TKVHvk_link.type = "text/css";
  TKVHvk_link.rel = "stylesheet";
  TKVHvk_link.href = fileName;

  TKVHvk_head.appendChild(TKVHvk_link);
}