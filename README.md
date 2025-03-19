# sed-win

sed for Windows. It doesn't support everything like sed, but I'm working on it.

## Option

- -i Edit the file in place without printing to the console (overwrite the file)
  (same as sed).

- -e Allows multiple commands to be executed (same as sed).

- -v variable (extra feature)

## Variables:

- $utcnow, output 2025-03-19T11:31:59Z

## Supported features:

- Special characters such as single quote, double quote

- -i

- -e

## Examples:

```
sed 's/bbb=.*/bbb=222/' 01.txt
```

Single quote

```
sed "s/'value111.*'/'value11191'/" 01.txt
```

Double quote

```
sed "s/\"value222.*\"/\"value22291\"/" 01.txt
```

-e

```
sed -e 's/bbb=111/bbb=222/' 01.txt
```

Multiple -e

```
sed -e 's/aaa.*/aaa=222/' -e 's/bbb=111/bbb=222/' 01.txt
```

Save to original file

```
sed 's/bbb=.*/bbb=222/' 01.txt
```

Variable: $utcnow, output 2025-03-19T11:31:59Z

Require -v flag

```
sed 's/bbb=.*/bbb=$utcnow/' -v 01.txt
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
