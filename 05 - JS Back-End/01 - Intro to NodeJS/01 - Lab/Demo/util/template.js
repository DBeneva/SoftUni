const fs = require('fs').promises;

async function loadTemplate(name) {
    try {
        const template = await fs.readFile(`./views/${name}.html`);
        return template;
    } catch (err) {
        return '';
    }
}

module.exports = {
    loadTemplate
};