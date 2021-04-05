import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("ShowAll");
    }

    async getHtml() {
        return `
            <h1>All notes</h1>
            <p>You are viewing the posts!</p>
        `;
    }
}