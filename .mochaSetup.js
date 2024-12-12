import { JSDOM } from "jsdom";
import sinon from "sinon";

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.FormData = jsdom.window.FormData;
global.history = jsdom.window.History;
