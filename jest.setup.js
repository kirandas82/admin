// jest.setup.js
// jest.setup.js
const { TextEncoder, TextDecoder } = require('text-encoding');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;