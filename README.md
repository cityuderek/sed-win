# sed-win

sed for Windows. It doesn't support everything like sed, but I'm working on it.

## Supported features:

- -i Edit the file in place without printing to the console (overwrite the
  file).

- -e Allows multiple commands to be executed.

## Usage:

```
sed 's/bbb=.*/bbb=222/' 01.txt
```

```
sed 's/\'single_quote_value91/\'single_quote_value106/' 01.txt
```

```
sed -e 's/bbb=111/bbb=222/' 01.txt
```

```
sed -e 's/aaa=111/aaa=222/' -e 's/bbb=111/bbb=222/' 01.txt
```

```
sed -i -e 's/aaa=111/aaa=222/' -e 's/bbb=111/bbb=222/' 01.txt
```

## Pending:

## Background

There are some sed.exe in Windows, but most of them have some problems.

## Reference

https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/

## Setup

```sh
npm install -g sed-win
```

## Test

```sh
sed 's/bbb=111/bbb=222/' 01.txt
```

<!--
## Pending doc:

- log-analysis

## Pending features:

- -i
- -e

- dev
node ./dist/bin/index.js -V
node ./dist/bin/index.js now
npm link

- test in another package
npm link sed-win

-->
