import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Zettelkasten</h1>
            <p>
                This is your zettelkasten.
            </p>
        `;
    }
}