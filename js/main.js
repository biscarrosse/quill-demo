// TODO: TS

class Counter {
	constructor(quill, options) {
		this.quill = quill;
		this.options = options;
		this.container = document.querySelector(options.container);
		quill.on('text-change', this.update.bind(this));
		this.update(); // Account for initial contents
	}

	calculate() {
		let text = this.quill.getText();
		if (this.options.unit === 'word') {
			text = text.trim();
			// Splitting empty text returns a non-empty array
			return text.length > 0 ? text.split(/\s+/).length : 0;
		} else {
			return text.length;
		}
	}

	update() {
		var length = this.calculate();
		var label = this.options.unit;
		if (length !== 1) {
			label += 's';
		}
		this.container.innerText = length + ' ' + label;
	}
}

class CustomModule {
	constructor(quill, props) {
		this.quill = quill;
		this.image = props.image;
		this.text = props.text;
		console.log('___ CustomModule quill: ', quill);
		console.log('___ CustomModule img: ', this.image);
		console.log('___ CustomModule txt: ', this.text);
	}
}

// Register custom modules:
Quill.register('modules/counter', Counter);
Quill.register('modules/customModule', CustomModule);

// const TOOLBAR_BUTTONS = [
// 	['bold', 'italic', 'underline', 'strike'], // toggled buttons
// 	[{ header: [1, 2, 3, 4, 5, 6, false] }],
// 	['blockquote', 'code-block'],
// 	[{ list: 'ordered' }, { list: 'bullet' }],
// 	[{ direction: 'rtl' }],
// 	// [{ idk: [1, 2, 3] }], // custom dropdown
// 	['image', 'code-block', 'video'],
// ];

const OPTIONS = {
	modules: {
		counter: {
			container: '#counter',
			unit: 'word',
		},
		customModule: { image: 'idk', text: 'txt' },
		toolbar: '#toolbar',
		//toolbar: TOOLBAR_BUTTONS,
	},
	placeholder: 'Compose an epic...',
	theme: 'snow',
};

const ROOT_ID = '#editor';

// initialize editor:
const quill_instance = new Quill(ROOT_ID, OPTIONS);
