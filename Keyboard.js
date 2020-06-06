function getKeyLayout()
{
	const keyLayout = ['²','&','é','"',"'",'(','-','è','_','ç','à',')','=','a','z','e','r','t','y','u','i','o','p','^','$','q','s','d','f','g','h','j','k','l','m','ù','*','<','w','x','c','v','b','n',',',';',':','!'];	
	const keys = document.getElementsByClassName("key");
	const upperKeyLayOut = ['²','1','2','3','4','5','6','7','8','9','0','°','+','A','Z','E','R','T','Y','U','I','O','P','¨','£','Q','S','D','F','G','H','J','K','L','M','%','µ','>','W','X','C','V','B','N','?','.','/','§'];	
	return [keyLayout,keys,upperKeyLayOut];
}

function setDefaultKey()
{
	const keyLayout = getKeyLayout();
		const keys = keyLayout[1];
		const keyout = keyLayout[0];		
	for (var i=0; i<keys.length; i++) 
	{
		keys[i].textContent = keyout[i];
	}
}

function detectInputsTexts()
{
		var inputs = document.getElementsByTagName('input');
	var inputstexts = [];
	for(var i = 0; i < inputs.length; i++) 
	{
		if(inputs[i].type.toLowerCase() == 'text') 
		{
        inputstexts[i] = inputs[i];
		}
	}

	var textareas = document.getElementsByTagName("textarea");
	var alltextsinputs = [...inputstexts,...textareas];

	for (var i=0; i<alltextsinputs.length; i++) 
	{
		alltextsinputs[i].addEventListener("focusin", keyboardOpener);
		alltextsinputs[i].addEventListener("focusout", keyboardOpener);
	}
}
	
function createkeys()
{
	//create main element
	const keyboard = document.createElement("div");
	const keysContainer = document.createElement("div");
	
	//Setup main elements
	keyboard.classList.add("keyboard","keyboard-hidden");
	keyboard.id = "keyboard"
	keysContainer.classList.add("keyboard-keys");
	
	//Add to DOMContentLoaded
	keyboard.appendChild(keysContainer);
	document.body.appendChild(keyboard);
	
	/////
	
	const fragment = document.createDocumentFragment();
	const keyLayout = getKeyLayout();
		const keyout = keyLayout[0];
		const keys = keyLayout[1];
	
	keyout.forEach(key => 
	{
		const keyElement = document.createElement("button");
		const insertlinebreak = ["$"].indexOf(key) !== -1;
		const insertbackspace = ["="].indexOf(key) !== -1;
		const insertentershift = ["*"].indexOf(key) !== -1;
		const insertspace = ["!"].indexOf(key) !== -1;
		
		//Add attributes/classes
		keyElement.setAttribute("type","button");
		keyElement.classList.add("key");
		fragment.appendChild(keyElement)
		
		if (insertbackspace)
		{
			const backspace = document.createElement("button")
			fragment.appendChild(backspace)
			backspace.id = "keybackspace";
			backspace.setAttribute("type","button");
			var imgbkspace = document.createElement("img");
			backspace.appendChild(imgbkspace);
			imgbkspace.src = 'images/backspace_white_192x192.png';
			imgbkspace.classList.add("iconkeyboard");
			fragment.appendChild(document.createElement("br"));
			
			console.log("backspace inserted");
		}
		
		if (insertlinebreak)
		{
			fragment.appendChild(document.createElement("br"))
			
			console.log("linebreak inserted");
		}
		
		if (insertentershift)
		{	
			fragment.appendChild(document.createElement("br"))
			const shift = document.createElement("button")
			fragment.appendChild(shift)
			shift.id = "keyupper"; 
			shift.setAttribute("type","button");
			var imgshift = document.createElement("img");
			shift.appendChild(imgshift);
			imgshift.src = 'images/keyboard_capslock_white_192x192.png';
			imgshift.classList.add("iconkeyboard");
			
			console.log("shift inserted");
		}
		if (insertspace)
		{
			fragment.appendChild(document.createElement("br"))
			const space = document.createElement("button")
			fragment.appendChild(space)
			space.id = "keyspacebar"; 	
			space.setAttribute("type","button");
			var imgspace = document.createElement("img");
			space.appendChild(imgspace);
			imgspace.src = 'images/space-bar.png';
			imgspace.classList.add("iconkeyboard");
			console.log("space inserted");
		}
	})
	
	keysContainer.appendChild(fragment);
	setDefaultKey();
		
	addCssFile('Keyboard.css');
	
	document.getElementById("keyboard").addEventListener("mousedown", function() {event.preventDefault()});
	document.getElementById("keybackspace").addEventListener("mousedown", keyErase);
	document.getElementById("keyupper").addEventListener("click", keyShift);
	document.getElementById("keyspacebar").addEventListener("click", keySpace);		
	document.getElementById("keyboard").addEventListener("mousedown", function() {event.preventDefault()});
	
	
	detectInputsTexts();

	for (var i=0; i<keys.length; i++) 
	{
		keys[i].index = i;
		keys[i].addEventListener("click", keyWrite);
	}
	
}

function keyWrite() 
{
	const keyLayout = getKeyLayout();
		const keyout = keyLayout[0];
		const keys = keyLayout[1];
		const upperkeyout = keyLayout[2];
	
	var keyoutmod = [...keyout];

	if(document.activeElement.tagName === "TEXTAREA" ||
		(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
	{
		if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
		{
			var startPos = document.activeElement.selectionStart;
			var endPos = document.activeElement.selectionEnd;
			if (document.getElementById("keyupper").classList.contains('upperActive'))
			{	
				for (var i=1; i<keys.length; i++) 
				{
					keyoutmod[i] = upperkeyout[i];
				}
			}
			document.activeElement.value = document.activeElement.value.substring(0, startPos)
			+ keyoutmod[this.index]
			+ document.activeElement.value.substring(endPos, document.activeElement.value.length);
			document.activeElement.selectionStart = startPos + keyoutmod[this.index].length;
			document.activeElement.selectionEnd = startPos + keyoutmod[this.index].length;

		}
		else 
		{
			document.activeElement.value += keyoutmod[this.index];
		}
	}	
}

function keySpace() 
{
	if(document.activeElement.tagName === "TEXTAREA" ||
		(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
	{
		if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
		{
			var startPos = document.activeElement.selectionStart;
			var endPos = document.activeElement.selectionEnd;
			document.activeElement.value = document.activeElement.value.substring(0, startPos)
			+ ' '
			+ document.activeElement.value.substring(endPos, document.activeElement.value.length);
			document.activeElement.selectionStart = startPos + ' '.length;
			document.activeElement.selectionEnd = startPos + ' '.length;
		}
	}	
}

function keyErase() 
{
	if(document.activeElement.tagName === "TEXTAREA" ||
		(document.activeElement.tagName === "INPUT" && document.activeElement.type === "text")) 
	{
		if (document.activeElement.selectionStart || document.activeElement.selectionStart == '0') 
		{
			var startPos = document.activeElement.selectionStart;
			var endPos = document.activeElement.selectionEnd;
			var firstpart = document.activeElement.value.substring(0, startPos)
			document.activeElement.value = firstpart.slice(0, firstpart.length -1)
			+ document.activeElement.value.substring(endPos, document.activeElement.value.length);
			document.activeElement.selectionStart = startPos -1;
			document.activeElement.selectionEnd = startPos -1;
		}
	}	
}

function keyShift()
{
	const keyLayout = getKeyLayout();
		const keyout = keyLayout[0];
		const keys = keyLayout[1];
		const upperkeyout = keyLayout[2];
	document.getElementById("keyupper").classList.toggle("upperActive");
	if (document.getElementById("keyupper").classList.contains('upperActive'))
	{
		for (var i=0; i<keys.length; i++) 
		{
			keys[i].textContent = upperkeyout[i];
		}
	}
	else
	{
		setDefaultKey();
	}
}

function keyboardOpener()
{
	console.log("Keyboard opened");
	
	document.getElementById("keyboard").classList.toggle("keyboard-hidden");
}

window.addEventListener("DOMContentLoaded",createkeys);

function addCssFile(fileName) 
{

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}