const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    button {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;

      background-color: black;
      border-radius: 1.5rem;
      padding: 0.5rem;
    }
    div {
      border: none;
      border-radius: 50%;
      font-weight: bold;
      padding: 0.5rem;
      height: 3rem;
      width: 3rem;

      opacity: 0.4;
      &.on {
        opacity: 1;
      }
    }
    .stop {
      background-color: red;
    }
    .yield {
      background-color: yellow;
    }
    .go {
      background-color: lawngreen;
    }
  </style>
  <button type="button">
    <div class="stop"></div>
    <div class="yield"></div>
    <div class="go"></div>
  </button>
`;

/**
 * This web component emulates a U.S. traffic light
 * with red, yellow, and green lights.
 * The `state` attribute specifies the initial state.
 * To advance to the next state, click the component
 * or call the next() method on an instance.
 * To get the current state, access the `state` property of an instance.
 * It is intentional that the state cannot be changed by
 * modifying the `state` attribute or setting the `state` property.
 */
class StopLight extends HTMLElement {
  static states = ["stop", "yield", "go"];
  #state;
  #stateToDivMap = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const initial = this.getAttribute("state");
    this.#state = StopLight.states.includes(initial) ? initial : "stop";

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const divs = this.shadowRoot.querySelectorAll("div");
    StopLight.states.forEach((state, index) => {
      this.#stateToDivMap.set(state, divs[index]);
    });

    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", () => this.next());
    this.#change(true);
  }

  get state() {
    return this.#state;
  }

  next() {
    this.#change(false);
    const s = this.#state;
    this.#state = s === "stop" ? "yield" : s === "yield" ? "go" : "stop";
    this.#change(true);
    this.dispatchEvent(
      new CustomEvent("stateChanged", {
        detail: { state: this.#state },
        bubbles: true,
        composed: true,
      })
    );
  }

  #change(on) {
    this.#stateToDivMap.get(this.#state).classList.toggle("on", on);
  }
}

customElements.define("stop-light", StopLight);
