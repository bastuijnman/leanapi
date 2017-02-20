# LeanAPI

LeanAPI generates a nice UI for your API specifications.

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