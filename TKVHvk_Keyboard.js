window.addEventListener("DOMContentLoaded",TKVHvk_detectInputTexts);

function TKVHvk_getKeyboardProperties()   //centralize the keyboard layout variables, just in case I want to make multiple version in the futur (ex QWERTY)
{
	const TKVHvk_keyLayout = ['²','&','é','"',"'",'(','-','è','_','ç','à',')','=','a','z','e','r','t','y','u','i','o','p','^','$','q','s','d','f','g','h','j','k','l','m','ù','*','<','w','x','c','v','b','n',',',';',':','!','www.','@','.com'];	
	const TKVHvk_keyButtons = document.getElementsByClassName("TKVHvk_keyButton");
	const TKVHvk_upperKeyLayOut = ['²','1','2','3','4','5','6','7','8','9','0','°','+','A','Z','E','R','T','Y','U','I','O','P','¨','£','Q','S','D','F','G','H','J','K','L','M','%','µ','>','W','X','C','V','B','N','?','.','/','§'];	
	return [TKVHvk_keyLayout,TKVHvk_keyButtons,TKVHvk_upperKeyLayOut];
}

function TKVHvk_setDefaultKeys()
{
	const x = TKVHvk_getKeyboardProperties();		
		const y = x[0];	
		const z = x[1];		
		
	for (var i=0; i<y.length; i++) 
	{
		z[i].textContent = y[i];
		console.log("default keys setting ... ");
	}
	console.log("default keys set ... done");
}

function TKVHvk_detectInputTexts()		//detect all ekements where text inputs are possible
{
	var TKVHvk_inputs = document.getElementsByTagName('input');
	var TKVHvk_inputTexts = [];
	for(var i = 0; i < TKVHvk_inputs.length; i++) 
	{
		if(TKVHvk_inputs[i].type.toLowerCase() == 'text') 
		{
			TKVHvk_inputTexts[i] = TKVHvk_inputs[i];
		}
		console.log("looking for input type text... done");
	}

	var TKVHvk_textAreas = document.getElementsByTagName("textarea");
	console.log("looking for textarea... done");
	var TKVHvk_allTextInputs = [...TKVHvk_inputTexts,...TKVHvk_textAreas];

	for (var i=0; i<TKVHvk_allTextInputs.length; i++) 
	{
		TKVHvk_allTextInputs[i].addEventListener("focusin", TKVHvk_keyboardOpener);
		TKVHvk_allTextInputs[i].addEventListener("focusout", TKVHvk_keyboardCloser);
		console.log("adding listener to input text/textarea...");
	}
	console.log("adding listener to input text/textarea... done");			//not working in mozilla temporary extension mode	//it doesnt go there, yet ...?
	return TKVHvk_allTextInputs;
}
	
function TKVHvk_keyWrite() 
{	
	console.log("trying to write...");									//not working in mozilla temporary extension mode
	const x = TKVHvk_getKeyboardProperties();
		const y = x[0];
		const z = x[1];
		const a = x[2];
	
	var b = [...y];    ///make a copy of the layout to convert in to uppercase if shift is active
	var c = this;		
		
	timer=setInterval(function(){	
		if(document.activeElement.tagName === "TEXTAREA" ||
			(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
		{
			if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
			{
				var TKVHvk_startPos = document.activeElement.selectionStart;
				var TKVHvk_endPos = document.activeElement.selectionEnd;
				if (document.getElementById("TKVHvk_keyUpper").classList.contains('TKVHvk_upperActive'))
				{	
					for (var i=1; i<z.length-3; i++) 
					{
						b[i] = a[i];
					}
				}
				document.activeElement.value = document.activeElement.value.substring(0, TKVHvk_startPos)
				+ b[c.index]
				+ document.activeElement.value.substring(TKVHvk_endPos, document.activeElement.value.length);
				document.activeElement.selectionStart = TKVHvk_startPos + b[c.index].length;
				document.activeElement.selectionEnd = TKVHvk_startPos + b[c.index].length;

			}
			else 
			{
				document.activeElement.value += b[c.index];
			}
		}
	},100);
	
	document.addEventListener("mouseup", function(){
    if (timer) clearInterval(timer)});
	console.log("success write... done");			
}

function TKVHvk_keySpace() 
{
	timer=setInterval(function(){ 
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
	}, 100);
	document.addEventListener("mouseup", function(){
    if (timer) clearInterval(timer)});
}

function TKVHvk_keyErase() 
{
	timer=setInterval(function(){ 
	
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
	}, 100);
	document.addEventListener("mouseup", function(){
    if (timer) clearInterval(timer)});
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
		for (var i=0; i<z.length-3; i++) 
		{
			z[i].textContent = a[i];
		}
	}
	else
	{
		TKVHvk_setDefaultKeys();
	}
}

function TKVHvk_keyboardCloser()
{
	document.getElementById("TKVHvk_keyboard").remove();
}

function TKVHvk_keyboardOpener()
{
	const TKVHvk_fragment = document.createDocumentFragment();
	const x = TKVHvk_getKeyboardProperties();
		const z = x[1];	
	
	var textOnFocus = this;
	var textOnFocusPosition = textOnFocus.getBoundingClientRect();
	
	console.log(textOnFocusPosition.top, textOnFocusPosition.right, textOnFocusPosition.bottom, textOnFocusPosition.left);
	
	textOnFocus.insertAdjacentHTML('afterend', '<div id="TKVHvk_keyboard" class="TKVHvk_keyboard"><div class="TKVHvk_keysContainer"><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" id="TKVHvk_keyBackSpace"><img class="TKVHvk_iconKeyboard" src="images/backspace_white_192x192.png"/></button></br><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button></br><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" id="TKVHvk_keyEnter"><img class="TKVHvk_iconKeyboard" src="images/round_keyboard_return_white_18dp.png" /></button></br><button type="button" id="TKVHvk_keyUpper"><img class="TKVHvk_iconKeyboard" src="images/keyboard_capslock_white_192x192.png" /></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button></br><button type="button" class="TKVHvk_keyButton"></button><button type="button" class="TKVHvk_keyButton"></button><button type="button" id="TKVHvk_keySpaceBar"><img class="TKVHvk_iconKeyboard" src="images/space-bar.png" /></button><button type="button" class="TKVHvk_keyButton"></button></div><div>');
	var keyboard = document.getElementById("TKVHvk_keyboard");
	
	TKVHvk_setStyle();
	keyboard.style.top = textOnFocusPosition.bottom + "px"  ; 
	keyboard.style.left = textOnFocusPosition.left + "px" ; 
	
	
	keyboard.addEventListener("mousedown", function(clicked) {clicked.preventDefault();console.log("default prevented");});
	document.getElementById("TKVHvk_keyBackSpace").addEventListener("mousedown", TKVHvk_keyErase);
	document.getElementById("TKVHvk_keyEnter").addEventListener("mousedown", TKVHvk_keyEnter);
	document.getElementById("TKVHvk_keyUpper").addEventListener("click", TKVHvk_keyShift);
	document.getElementById("TKVHvk_keySpaceBar").addEventListener("mousedown", TKVHvk_keySpace);
	
	TKVHvk_setDefaultKeys();
		
	
	console.log("preparing write listener ...");
	for (var i=0; i<z.length; i++) 
	{
		z[i].index = i;
		z[i].addEventListener("mousedown", TKVHvk_keyWrite);
		console.log("adding write listener...");
	}
	console.log("adding write listener ... done");
}

function TKVHvk_keyEnter() 
{
	timer=setInterval(function(){ 
		if(document.activeElement.tagName === "TEXTAREA" ||
			(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
		{
			if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
			{
				var TKVHvk_startPos = document.activeElement.selectionStart;
				var TKVHvk_endPos = document.activeElement.selectionEnd;
				document.activeElement.value = document.activeElement.value.substring(0, TKVHvk_startPos)
				+ '\r\n'
				+ document.activeElement.value.substring(TKVHvk_endPos, document.activeElement.value.length);
				document.activeElement.selectionStart = TKVHvk_startPos + ' '.length;
				document.activeElement.selectionEnd = TKVHvk_startPos + ' '.length;
			}
		}	
	}, 100);
	document.addEventListener("mouseup", function(){
    if (timer) clearInterval(timer)});
}

function TKVHvk_setStyle()
{
	var classTKVHvk_keyboard = document.getElementsByClassName("TKVHvk_keyboard");
	for (var i=0; i<classTKVHvk_keyboard.length; i++)
	{
		classTKVHvk_keyboard[i].setAttribute("style", " position:fixed; padding:1em 1em; background:black; user-select:none; z-index: 999999999;");
	}	
	var classTKVHvk_keysContainer = document.getElementsByClassName("TKVHvk_keysContainer");
	for (var i=0; i<classTKVHvk_keysContainer.length; i++)
	{
		classTKVHvk_keysContainer[i].setAttribute("style", "text-align: center;");
	}

	var classTKVHvk_keysContainer_buttons = classTKVHvk_keysContainer[0].getElementsByTagName("button");
	for (var i=0; i<classTKVHvk_keysContainer_buttons.length; i++)
	{
		classTKVHvk_keysContainer_buttons[i].setAttribute("style", "height: 2.5em;width: 1.7em;margin: 0.1em 0.2em;border-radius: 4px;border: none;background: rgba(255, 255, 255, 0.2);color: #ffffff;font-size: 0.6em;outline: none;cursor: pointer;display: inline-flex;align-items: center;justify-content: center;vertical-align: top;padding: 0;-webkit-tap-highlight-color: transparent;position: relative;");
	}

	var classTKVHvk_iconKeyboard = document.getElementsByClassName("TKVHvk_iconKeyboard");
	for (var i=0; i<classTKVHvk_iconKeyboard.length; i++)
	{
		classTKVHvk_iconKeyboard[i].setAttribute("style", "width:1em;height:1.3em;");
	}
	document.getElementById("TKVHvk_keySpaceBar").setAttribute("style", "height: 2.5em;margin: 3px;border-radius: 4px;border: none;background: rgba(255, 255, 255, 0.2);color: #ffffff;font-size: 0.7em;outline: none;cursor: pointer;display: inline-flex;align-items: center;justify-content: center;vertical-align: top;padding: 0;-webkit-tap-highlight-color: transparent;position: relative;max-width:100%;width:15em;")
}

/*function TKVHvk_addCssFile(fileName) 
{

  var TKVHvk_head = document.head;
  var TKVHvk_link = document.createElement("link");

  TKVHvk_link.type = "text/css";
  TKVHvk_link.rel = "stylesheet";
  TKVHvk_link.href = fileName;

  TKVHvk_head.appendChild(TKVHvk_link);
}*/