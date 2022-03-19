'use strict';

var expect = require('expect.js');
var markdownLinkExtractor = require('../');

describe('markdown-link-extractor', function () {

    it('should return an empty array when no links are present', function () {
        var { links } = markdownLinkExtractor('No links here');
        expect(links).to.be.an('array');
        expect(links).to.have.length(0);
    });

    it('should extract a link in a [tag](http://example.com)', function () {
        var { links } = markdownLinkExtractor('[example](http://www.example.com)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('http://www.example.com');
    });

    it('should extract mailto: link from <test@example.com>', function () {
        var { links } = markdownLinkExtractor('<test@example.com>)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('mailto:test@example.com');
    });

    it('should extract a link in a with escaped braces [tag](http://example.com\(1\))', function () {
        var { links } = markdownLinkExtractor('[XMLHttpRequest](http://msdn.microsoft.com/library/ie/ms535874\\(v=vs.85\\).aspx)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('http://msdn.microsoft.com/library/ie/ms535874(v=vs.85).aspx');
    });

    it('should extract an image link in a ![tag](http://example.com/image.jpg)', function () {
        var { links } = markdownLinkExtractor('![example](http://www.example.com/image.jpg)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('http://www.example.com/image.jpg');
    });

    it('should extract an image link in a ![tag](foo/image.jpg)', function () {
        var { links } = markdownLinkExtractor('![example](foo/image.jpg)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('foo/image.jpg');
    });

    it('should extract two image links', function () {
        var { links } = markdownLinkExtractor('![img](http://www.example.test/hello.jpg) ![img](hello.jpg)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(2);
        expect(links[0]).to.be('http://www.example.test/hello.jpg');
        expect(links[1]).to.be('hello.jpg');
    });

    it('should extract an image link in a ![tag](foo/image.jpg =20%x50)', function () {
        var { links } = markdownLinkExtractor('![example](foo/image.jpg =20%x50)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('foo/image.jpg');
    });

    it('should extract a bare link http://example.com', function () {
        var { links } = markdownLinkExtractor('This is a link: http://www.example.com');
        expect(links).to.be.an('array');
        expect(links).to.have.length(1);
        expect(links[0]).to.be('http://www.example.com');
    });

    it('should extract multiple links', function () {
        var { links } = markdownLinkExtractor('This is an [example](http://www.example.com). Hope it [works](http://www.example.com/works)');
        expect(links).to.be.an('array');
        expect(links).to.have.length(2);
        expect(links[0]).to.be('http://www.example.com');
        expect(links[1]).to.be('http://www.example.com/works');
    });

    it('should return full objects in extended mode', function () {
        var { links } = markdownLinkExtractor('This is an [example](http://www.example.com). Hope it [works](http://www.example.com/works)', true);
        expect(links).to.be.an('array');
        expect(links).to.have.length(2);
        expect(links[0]).to.eql({
            type: 'link',
            raw: '[example](http://www.example.com)',
            href: 'http://www.example.com',
            title: null,
            text: 'example',
            tokens: [ { type: 'text', raw: 'example', text: 'example' } ],
        });
        expect(links[1]).to.eql({
            type: 'link',
            raw: '[works](http://www.example.com/works)',
            href: 'http://www.example.com/works',
            title: null,
            text: 'works',
            tokens: [ { type: 'text', raw: 'works', text: 'works' } ],
        });
    });
    it('should collect anchor tags', function () {
        var { anchors } = markdownLinkExtractor('# foo\n# foo');
        expect(anchors).to.eql(['#foo','#foo-1']);
    });

});
