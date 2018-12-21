# Leanapi Changelog

## [Unreleased]

### Features
* Added search feature

### Bugfixes
* Fixed an issue where import paths where not followed correctly, which resulted in a non-functioning build.

## 1.5.0

### Changes
* Removed CSSX from components.
* Made body examples optional.
* Changed bundler to `webpack` instead of `browserify`.
* Updated all UI packages to their latest respective major version.

### Bugfixes
* Fixed issues detected by `npm audit`.
* Fixed issue where menu was not collapsable.

## 1.4.0

### Features
* Added support for JSON Schema in request bodies.

## 1.3.1

### Bugfixes
* Fixed a bug where serving a spec with a security scheme which doesnt contain a body killed the dev server. Added a warning when occuring.

## 1.3.0

### Features
* Added basic support for request/response headers.
* Added support for headers/responses from security schemes.

### Changes
* Made sure the schema is scrollable when overflowing.
* Manage component update with props instead of state, which handles updates through the server better.
* Changed all component syntax to ES6.
* Increased font-size for schema viewer to 16px.
* Increased default width for schema dialog.
* Moved API navigation to it's own component.
* Add active state for Nav items.

### Bugfixes
* Fixed a bug where when updating the schema the application was not updating the state (while in serve mode).
* Fixed a bug when reloading did not get the updated API spec document.
* Fixed a bug where schema's where loaded from NodeJS module cache, now using FS instead for loading.

## 1.2.2

### Bugfixes
* Fixed a similar bug to the last one where CSS inclusion was going wrong on build time.

## 1.2.1

### Bugfixes
* Fixed a bug where the JSON schema view library could not be loaded during build time.

## 1.2.0

### Features
* Added serve & watch functionality.
* Added port chooser for serve & watch.
* Added JSON schema viewer.

## Changes
* Added some defensive statements to parser for checking properties.
* **BREAKING** Only support RAML 1.0
* Change schema checker to only support RAML 1.0 types.

## 1.1.1

### Changes
* Updated styling for body descriptions.

### Bugfixes
* Fixed bug where calls with empty responses where not rendered.

## 1.1.0

### Features
* Added support for request bodies.

### Changes
* Added key property to call parameters.

## 1.0.3

### Bugfixes
* Fixed missing dependencies when building with syntax highlighter due to them only being dev-dependencies.

## 1.0.2

### Bugfixes
* Corrected dev-dependencies to dependencies.

## 1.0.1

### Bugfixes
* Fix missing parser issue.

## 1.0.0

Initial release