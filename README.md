# grunt-mustache-generate v1.0.0

> Grunt task to generate html pages and optionally partials for reuse client side.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mustache-generate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mustache-generate');
```

### Settings

There are a number of options available. Please review the [minimatch options here](https://github.com/isaacs/minimatch#options). As well as some additional options as follows:

#### files
Type: `String|Array`

This defines what file patterns this task will watch. Can be a string or an array of files and/or minimatch patterns.

#### options.globalData
Type: `String`

This defines the location of a JSON file containing settings shared across all mustache pages.

#### options.partials
Type: `Object`

This defines the mustache partials if used.

#### options.partials.src
Type: `Array`

Base directories containing mustache partials (task recursively searches within these directories).

#### options.partials.dest
Type: `String`

If you want to output the partials as a Javascript consumable, set a target filename (without file extension).

#### options.partials.varName
Type: `String`

By setting a variable name, the partial output will be saved as a .js file with the varName equal to the template object.
(If you don't set this, the partial output will be a .json file)

#### options.dataDir
Type: `String`

Page data is by default looked for in the same directory as the mustache pages. If desired the json can be contained in a separate directory.

#### options.output
Type: `String`
Default: `.html`

Set the page output file extension.

#### options.logLevel
Type: `Integer`
Default: `1`

## Example Grunt settings

Set the logging levels:
  0 = no logging.
  1 = log pages.
  2 = (and) log partials.

```js
mustacheTemplates: {
  options: {
    globalData: 'site.json',
    partials: {
      src: ['partialDir', 'other_partialDir'],
      dest: 'target/partials',
      varName: 'myNS.partials'
    },
    dataDir: 'data',
    output: '.html',
    logLevel: 2
  },
  files: {
    expand: 'true',
    cwd: 'pages/',
    src: '**/*.mustache',
    dest: 'target'
  }
}
```
