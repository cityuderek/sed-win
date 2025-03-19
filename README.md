# sed-win

sed for Windows. It doesn't support everything like sed, but I'm working on it.

It allows you using command `sed-win` or `sed` (alias) in DOS, acts like in
linux.

## Supported features:

- -i like sed

- -e like sed

- Special characters such as single quote, double quote

- date time variable like ${utcnow} (eg 2024-09-01T11:31:59Z)

- increment variable like ${$1+1} (eg changing 90 to 91)

## Setup

```sh
npm install -g sed-win
```

## Test

```sh
sed 's/bbb=111/bbb=222/' 01.txt
```

## Variables:

Use dynamic replaceValue. This option is enabled by default

Example:

```
sed "s/bbb=.*/bbb=${utcnow}, ${now}, ${date}, ${date8}, ${datetime15}/" 01.txt
```

- ${utcnow} - The current date and time in Coordinated Universal Time (UTC), eg
  2025-03-19T11:31:59Z

- ${now} - Local date time, eg 2025-03-19T11:31:59Z

- ${date} - Local date, eg 2025-03-19

- ${date8} - Local date, eg 20250319

- ${datetime15} - Local date time, eg 20250319_084410

- ${$n+1} - Increment number, eg ${$1+1}, ${$2+1}

  - PS: n is a number between 1-10

## Examples:

Basic sed

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

Date time variable: $utcnow, output 2025-03-19T11:31:59Z

```
sed "s/bbb=.*/bbb=${utcnow}, ${now}, ${date}/" 01.txt
```

Increment variable: ${$1+1}, ... ${$10+1}

```
sed 's/bbb=(\d+)/bbb=${$1+1}fff/' 01.txt
```

```
bbb=111bb
->
bbb=112fffbb
```

Update version in config file

```
sed 's/version=(\d+)\.(\d+)\.(\d+)/version=$1.$2.${$3+1}/' 01.txt
```

```
version=1.0.90-prod
->
version=1.0.91-prod
```

Update version in config file (.chalice\config.json)

```
sed -i "s/\"APP_VERSION\": \"(\d+).(\d+).(\d+)\"/\"APP_VERSION\": \"$1.$2.${$3+1}\"/" .chalice\config.json
```

```
"APP_VERSION": "1.0.10",
->
"APP_VERSION": "1.0.11",
```

Update DEPLOYED_AT in config file (.chalice\config.json)

```
sed -i "s/\"DEPLOYED_AT\": \".*\"/\"DEPLOYED_AT\": \"${utcnow}\"/" .chalice\config.json
```

```
"DEPLOYED_AT": "2024-09-01T00:00:00Z",
->
"DEPLOYED_AT": "2025-03-19T23:23:40Z",
```

Disable variable like $utcnow

```
sed "s/bbb=.*/bbb=${utcnow}/" -a 01.txt
```

## Option

- -i Edit the file in place without printing to the console (overwrite the file)
  (same as sed).

- -e Allows multiple commands to be executed (same as sed).

- -a Avoid variable like ${utcnow}, ${$1+1}

## Unsupported Examples:

In Windows, command must use double quote to seperate parameters, single quote
may cause problem

Below command doesn't work since it contains space and not using double quote

```
sed 's/bbb=.*/bbb=${utcnow}, ${now}/' 01.txt
```

## Background

There are some sed.exe in Windows, but most of them have some problems.

## Reference

https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/

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
