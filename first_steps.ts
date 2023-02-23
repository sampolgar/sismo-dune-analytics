import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';

console.log('Welcome to Deno!');

let resp = await fetch('https://example.com');

const env = await load();
const password = env['TEST'];
console.log(`password: ${password}`);

Deno.test('url test', () => {
  const url = new URL('./foo.js', 'https://deno.land/');
  assertEquals(url.href, 'https://deno.land/foo.js');
});
