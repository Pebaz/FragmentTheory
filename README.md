# FragmentTheory
Post and ingest JSON data to and from static pages.


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

<button onclick="ftPost('./Page2.html', JSON.parse(document.getElementById('json').value))">Send Hashed JSON to Page2</button>
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
