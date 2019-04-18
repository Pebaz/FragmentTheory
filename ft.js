/*
"POST" data from one static page to another static page easily.

Go to new page and give data to it:
```
ftPost('http://some.page.com/index.html', {'My' : 'data'})
```

Get JSON data from page fragment:
```
ftGetFragment()
```
*/


function ftPost(page, data)
{
	var buffer = msgpack.encode(data);
	var encoded = btoa(String.fromCharCode.apply(null, buffer));

	if (page.startsWith("file:///"))
	{
		if (page.endsWith('/'))
			var url = page + '#/' + encoded;
		else
			var url = page + '#' + encoded;
	}
	else
	{
		var url = new URL(page);
		url.hash = encoded;
	}

	window.location = url;
}


function ftGetFragment()
{
	var hash = window.location.hash.slice(1);
	var buffer = Uint8Array.from(atob(hash), c => c.charCodeAt(0))
	var data = msgpack.decode(buffer);
	return data;
}
