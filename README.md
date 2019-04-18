<h1 align="center">Fragment Theory</h1>

<div align="center">
	<img src=misc/Logo.png width=192 />
</div>

<div align="center">
	<strong>Web apps without hosting</strong>
</div>
<div align="center">
	<h3>
		<a href="https://github.com/Pebaz/Pity">
			Pity
		</a>
		<span> | </span>
		<a href="https://github.com/Pebaz/FragmentTheory">
			Fragment Theory
		</a>
		<span> | </span>
		<a href="https://github.com/Pebaz/Concise">
			Concise
		</a>
	</h3>
</div>

<div align="center">
	Post and ingest JSON data to and from static pages.
</div>

## TL;DR

If you create a page using [Pity](https://github.com/Pebaz/Pity), you can then
shorten the generated URL (which can be quite long) with
[Concise](https://github.com/Pebaz/Concise) and then pass data between the
pages using [Fragment Theory](https://github.com/Pebaz/FragmentTheory).

## Fragment Theory Trifecta

Fragment Theory is two things:

 * A small JavaScript library that allows you to store JSON data in URL
   fragments.
 * A set of three related technologies that all compliment each other:
   - Fragment Theory (JS library)
   - Pity (HTML pages contained within URLs)
   - Concise (URL shortener)

A use case for these three technologes is detailed below but here is a brief
synopis:

Suppose you want to have a simple static web page. This is extremely easy to do
and here are a few among many:

 * [Github Pages](https://pages.github.com/)
 * [Surge.sh](https://surge.sh/)
 * [Zeit](https://zeit.co/docs/v2/deployments/official-builders/static-now-static/)

The problem with hosting a static site is that it's static! I have consistently
had the need to quickly host a static site and send data from one page to
another with very few good options for doing this.

This is why I created **Fragment Theory**. It allows you to very easily send
JSON data to another page via the URL fragment. E.g:

<img src=examples/URLFragment.jpg />

Fragment Theory makes use of [MessagePack](https://github.com/kawanet/msgpack-lite)
to compress the JSON before sending it via the URL fragment.

### Example

```html
<!-- Page1.html -->
<script src="https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Pebaz/FragmentTheory@v0.1.1/ft.js"></script>

<textarea id=json rows=10 cols=25>
{
    "name" : "Pebaz",
    "age" : 24,
    "inventory" : [
        "Pickaxe",
        "Shovel",
        "Axe"
    ]
}
</textarea>

<br />

<button onclick="ftPost('./Page2.html', JSON.parse(document.getElementById('json').value))">
	Send Hashed JSON to Page2
</button>
```

```html
<!-- Page2.html -->

<script src="https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Pebaz/FragmentTheory@v0.1.1/ft.js"></script>

<script>
	var data = ftGetFragment();
	document.write(`
		Hello ${data.name}, I see here that you are ${data.age} years old and
		have ${data.inventory.length} items in your inventory.
	`);

	document.write('<ul>');
	for (item in data.inventory)
	{
		document.write(`<li>${data.inventory[item]}</li>`);
	}
	document.write('</ul>');
</script>

```

Which results in:

Page 1:
<img src=examples/hello_world/Page1.jpg />

Page 2:
<img src=examples/hello_world/Page2.jpg />

Click here for a [live demo](https://pbz-url.herokuapp.com/8).
Example makes use of [Pity](https://github.com/Pebaz/Pity) to create URLs that contain web pages and
[Concise](https://github.com/Pebaz/Concise) to shorten them.
