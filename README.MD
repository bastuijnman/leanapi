# LeanAPI

LeanAPI generates a nice UI for your API specifications.

## Supported API specification formats:
* [RAML 1.0]( https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/)

## Usage

Install using the following command:
```
npm install -g leanapi
```

Generate documentation using the following command:
```
leanapi path/to/your/api/definition.raml
```

This will generate a new folder called `api-docs` where all of the neccesary files have been generated. You can deploy this folder to any webserver.

### Options

#### Output folder
You can specify the ouptput folder by using `-o` or `--output`, example:
```
leanapi -o docs path/to/your/api/definition.raml
```

#### Serve
You can dynamically serve your API (without generating the API output) by using `-s` or `--serve`, example:
```
leanapi -s path/to/your/api/definition.raml
```
This will also start watching in your definition path (e.g. `path/to/your/api`), so when you make a change to any file in that folder the api definition will update automatically and any open browser window will automatically refresh.

##### Port
You can set the port on which the API server will be listening (default is `9876`) by using `-p` or `--port`
```
leanapi -s -p 9090 path/to/your/api/definition.raml
```
This will make the server listen on port `9090`

#### Help
You can prompt the help info by running:
```
leanapi -h
# or
leanapi --help
```

#### Version
You can check the leanAPI version by running:
```
leanapi -V
# or
leanapi --version
```