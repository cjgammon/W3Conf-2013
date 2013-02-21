function handle_KEY_DOWN(e) {
	
  switch (e.keyCode) {
	case 27: //ESC
		if (parent) {
			parent.focus();
		}
		break;
	case 38: //UP
		e.preventDefault();
		break;
	case 40: //DOWN
		e.preventDefault();	
		break;
	case 91:
		e.preventDefault();
		break;
	}
}

document.addEventListener('keydown', handle_KEY_DOWN);
