# DEPREDICATED IN FAVOR OF https://github.com/anonyco/FastestSmallestTextEncoderDecoder

# string16js
A super lightweight javascript utility library for working with high unicode characters

# How to use/install
Simply insert the following line of code into your head before any other scripts.
```HTML
<script src="https://dl.dropboxusercontent.com/s/ll11ftru2az384q/string16.min.js?dl=0"></script>
```
Or, if you insterested in not being the laziest possible human being, then you can super speed up you page by adding the `defer=""` attribute to all of your scripts like so. The `defer=""` attribute keeps the scripts executing in the same order, but makes the assumtion your script will not call `document.write`, allowing the browser the parse the whole page before executing the scripts.
```HTML
<!doctype html>
<html><head>
	<script src="https://dl.dropboxusercontent.com/s/ll11ftru2az384q/string16.min.js?dl=0" defer=""></script>
	<script src="/path/to/other/scripts.js" defer=""></script> <!--replace this with your scripts-->
	<title>Example Domain</title>
</head><body>
	<h1>Example Domain</h1>
</body></html>
```
A common error that might arise (in the console you can get to by pressing Ctrl+Shift+I) from putting the `defer=""` attribute into all of your scripts is `Uncaught ReferenceError: string16 is not defined`. This error is likely caused by one of three things:

1. You have an inline script that looks like the one below.
```HTML
<script defer="">
	var str = "Hello World!";
	// ... (rest of your javascript code)
</script>
```
1.1. The first solution to this is to take that javascirpt code and put it into a separate file. This will work because the `defer=""` attribute has no effect on inline javascript code.
1.2 The second option is to wrap your whole script in an event listener function that delays the execution until after the page has loaded like so.
```HTML
<script defer="">
	addEventListener("load", function(){
		var str = "Hello World!";
		// ... (rest of your javascript code)
	}, {once:1});
</script>
```
2. You did not put `defer=""` into all of your scripts. Double check to make sure all your scripts have the `defer=""` attribute
3. You did not put this string16.js script at the top. Make sure string16.js is at the top, before all other scripts.



# How to use string16js
String16js adds a global `window.string16` object for all your strings to use. See the following chart below for what each of theese methods does and an example of how to use it.


<table>
	<thead>
	</thead>
	<tbody>
		<tr>
			<td><code>string16.arrayToString</code></td>
			<td>
				Converts an array of numbers into a uncode string, treating each number in the array as a 16-bit positive integer number that is `>=0`, and `<=65535`, or wrapping it around to a number in that range in a fashion expressible by the `%` modulus operator (i.e. if a number, `x`, in the array is not `0 <= x <= 65535`, then it does `x = x % 65536`. Then if `x < 0`, then it does `x = x + 65536`).
				<h3>Example:</h3>
<pre class="highlight highlight-text-html-basic">
document.body.insertAdjacentHTML("beforeend", '&lt;pre style="background:#ccc"&gt;' +
	string16.arrayToString([65, 32, 55357, 56898, 32, 115, 109, 105, 108, 101, 115]) +
'&lt;/pre&gt;')
</pre>
			</td>
		</tr>
		<tr>
			<td><code>string16.stringToArray</code></td>
			<td>
				Converts a string into an array of numbers
			</td>
		</tr>
	</tbody>
</table>





