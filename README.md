# string16js
A super lightweight javascript utility library for working with high unicode characters

# How to use/install
Simply insert the following line of code into your head before any other scripts.
```HTML
<script src="https://www.dropbox.com/s/ll11ftru2az384q/string16.min.js?dl=2"></script>
```
Or, if you insterested in not being the laziest possible human being, then you can super speed up you page by adding the `defer=""` attribute to all of your scripts like so.
```HTML
<!doctype html>
<html><head>
	<script src="https://www.dropbox.com/s/ll11ftru2az384q/string16.min.js?dl=2" defer=""></script>
	<script src="/path/to/other/scripts.js" defer=""></script> <!--replace this with your scripts-->
	<title>Example Domain</title>
</head><body>
	<h1>Example Domain</h1>
</body></html>
```
# How to use string16js
String16js adds a global `window.string16` object for all your strings to use. See the following chart below for what each of theese methods does and an example of how to use it.


<table>
	<thead>
	</thead>
	<tbody>
		<tr>
			<td>
```Javascript
string16.arrayToString
```			</td>
			<td>Converts an array of numbers into a uncode string, treating each number in the array as a 16-bit positive integer number that is `>=0`, and `<=65535`, or wrapping it around to a number in that range in a fashion expressible by the `%` modulus operator (i.e. if a number, `x`, in the array is not `0 <= x <= 65535`, then it does `x = x % 65536`. Then if `x < 0`, then it does `x = x + 65536`). </td>
		</tr>
	</tbody>
</table>

| Tables                             | Description           | Cool  |
| ---------------------------------- | ------------- | ----- |
| string16.arrayToString             | ```Javascript
window.k = function(){

};
```
                                                     | $1600 |
| string16.arrayToString             | right-aligned | $1600 |





