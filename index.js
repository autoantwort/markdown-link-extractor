'use strict';

const { marked } = require('marked');
const htmlLinkExtractor = require('html-link-extractor');

module.exports = function markdownLinkExtractor(markdown, extended = false) {
    const anchors = [];

    const renderer = {
        heading(text, level, raw, slugger) {
            anchors.push(`#${this.options.headerPrefix}${slugger.slug(raw)}`);
        }
    };

    marked.setOptions({
        mangle: false, // don't escape autolinked email address with HTML character references.
    });
    marked.use({ renderer });

    const html = marked(markdown);
    const links = htmlLinkExtractor(html);
    return { links, anchors };
};
