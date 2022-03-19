# markdown-link-extractor

Extracts links from markdown texts.

## Installation
```bash
$ npm install --save markdown-link-extractor
```
## API

### markdownLinkExtractor(markdown, extended=false)

Parameters:

* `markdown` text in markdown format.
* `extended` enables extended output. Returns an object with metadata rather than the URL as a string (when `extended===false`)

Returns:

* an object with the following properties:
  * `.anchors`: an array of anchor tag strings (e.g. `[ "#foo", "#bar" ]`).
  * `.links`: an array containing the URLs from the links found.
    - when `extended === false` array contains strings
    - when `extended === true` array contains objects

## Examples

```js
const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

const markdown = readFileSync('README.md', {encoding: 'utf8'});

const { links } = markdownLinkExtractor(markdown);
links.forEach(link => console.log(link));
```

Extended output format:

```js
{ type: 'link',
  raw:
   '[LICENSE.md](https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md)',
  href:
   'https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md',
  title: null,
  text: 'LICENSE.md',
  tokens: [ { type: 'text', raw: 'LICENSE.md', text: 'LICENSE.md' } ] }
```

## Upgrading to v2.0.0

The return value changed from an array to an object. The old return value is
found at the property `links`.

Code that looked like this:

```
const links = markdownLinkExtractor(str);
```

Should change to this:

```
const { links } = markdownLinkExtractor(str);
```

## Testing

    npm test

## License

See [LICENSE.md](https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md)
