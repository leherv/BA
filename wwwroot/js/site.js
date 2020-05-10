class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._show = this._show.bind(this);
        this._hide = this._hide.bind(this);
    }

    connectedCallback() {
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'tooltip');

        if (!this.hasAttribute('tabindex'))
            this.setAttribute('tabindex', -1);

        this._hide();

        this._target = document.querySelector('[aria-describedby=' + this.id + ']');
        if (!this._target)
            return;

        this._target.addEventListener('focus', this._show);
        this._target.addEventListener('blur', this._hide);
        this._target.addEventListener('mouseenter', this._show);
        this._target.addEventListener('mouseleave', this._hide);
    }

    disconnectedCallback() {
        if (!this._target)
            return;
        this._target.removeEventListener('focus', this._show);
        this._target.removeEventListener('blur', this._hide);
        this._target.removeEventListener('mouseenter', this._show);
        this._target.removeEventListener('mouseleave', this._hide);
        this._target = null;
    }

    _show() {
        this.hidden = false;
    }

    _hide() {
        this.hidden = true;
    }
}

window.customElements.define('x-tooltip', Tooltip);

const dropdownTemplate = document.createElement('template');
dropdownTemplate.innerHTML = `
    <button></button>
    <div>
        <slot></slot>
    </div>
`;

class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(dropdownTemplate.content.cloneNode(true));
        this._show = false;
        this._button = this.shadowRoot.querySelector('button');
        this._button.innerText = this._label;
        this._optionsContainer = this.shadowRoot.querySelector('div');
        this._optionsContainer.style.display = 'none';
        this._toggle = this._toggle.bind(this);
    }

    connectedCallback() {
        this._button.addEventListener('click', this._toggle);
    }

    disconnectedCallback() {
        this._optionsContainer = null;
        this._show = false;
        if (!this._button)
            return;
        this._button.removeEventListener('click', this._toggle);
        this._button = null;
    }

    _toggle() {
        this._show = !this._show;
        this._optionsContainer.style.display = this._show ? 'block' : 'none';
    }

    get _label() {
        return this.getAttribute('label');
    }
}

window.customElements.define('x-dropdown', Dropdown);

const dropdownTemplate2 = document.createElement('template');
dropdownTemplate2.innerHTML = `
    <button></button>
    <div></div>
`;

class Dropdown2 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(dropdownTemplate2.content.cloneNode(true));
        this._show = false;
        this._button = this.shadowRoot.querySelector('button');
        this._button.innerText = this._label;
        this._optionsContainer = this.shadowRoot.querySelector('div');
        this._optionsContainer.style.display = 'none';
        this._options = [];
        this._toggle = this._toggle.bind(this);
    }

    connectedCallback() {
        this._button.addEventListener('click', this._toggle);
    }

    disconnectedCallback() {
        if (!this._button)
            return;
        this._button.removeEventListener('click', this._toggle);
        this._button = null;
        this._options = [];
        this._show = false;
    }

    _toggle() {
        this._show = !this._show;
        this._optionsContainer.style.display = this._show ? 'block' : 'none';
    }

    get _label() {
        return this.getAttribute('label');
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
        this._render()
    }

    _render() {
        this._optionsContainer.textContent = '';
        this.options.forEach(o => {
            const option = document.createElement('option');
            option.innerHTML = o.label;
            option.value = o.value;
            this._optionsContainer.appendChild(option);
        })
    }
}

window.customElements.define('x-dropdown2', Dropdown2);

const translations = window.project.translations;

function localize(key) {
    if (translations.hasOwnProperty(key)) {
        return translations[key];
    }
    return key;
}

document.querySelector('x-dropdown2').options = [
    {label: localize('Österreich'), value: localize('at')},
    {label: localize('Deutschland'), value: localize('de')}
];