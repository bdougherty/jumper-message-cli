```
┓┏┓┏┓┃
┛┗┛┗┛┃ ⟍ ○⟋
┓┏┓┏┓┃   ∕    jumper
┛┗┛┗┛┃ ノ)     message
┓┏┓┏┓┃        cli
┃┃┃┃┃┃
┻┻┻┻┻┻
```


## Install

```
$ npm install --global jumper-message-cli
```


## Usage

```
$ jumper-message --help

  Usage
    $ jumper-message <string>
    $ echo <string> | jumper-message

	Options
	  --floors         Number of additional floors to add (Default: 0)
	  --compact        Remove extra spacing between message lines (Default: false)
	  --gradient       Render the text as a gradient (Default: none)
	  --building-style Chalk style string for the building (Default: gray)
	  --message-style  Chalk style string for the message (Default: bold.white)
	  --person-style   Chalk style string for the person (Default: white)

	Examples
	  jumper-message 'Friday deploy, good luck!'
	  jumper-message 'Friday deploy, good luck!' --gradient=rainbow
	  jumper-message 'Friday deploy, good luck!' --floors=4
	  jumper-message 'Friday deploy, good luck!' --compact --message-style=bold.red.bgWhite
```

Style arguments use the [chalk style syntax](https://github.com/chalk/chalk#styles).

Gradients are provided by the [gradient-string](https://github.com/bokub/gradient-string) package. Available gradients are:

[![gradients](https://i.imgur.com/ptmGdgt.png)](https://github.com/bokub/gradient-string#available-built-in-gradients)

Message style and gradients cannot be combined. If a gradient is specified, it will override the message style.

## Related

* [jumper-message](https://github.com/bdougherty/jumper-message) - API for this module
* [chalk](https://github.com/chalk/chalk)
* [gradient-string](https://github.com/bokub/gradient-string)

## License

MIT © [Brad Dougherty](https://brad.is)
