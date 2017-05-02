# Leanapi Changelog

## Unreleased

### Bugfixes
* Fixed a similar bug to the last one where CSS inclusion was going wrong on build time.

## 1.2.1

### Bugfixes
* Fixed a bug where the JSON schema view library could not be loaded during build time.

## 1.2.0

### Features
* Added serve & watch functionality
* Added port chooser for serve & watch
* Added JSON schema viewer

## Changes
* Added some defensive statements to parser for checking properties
* **BREAKING** Only support RAML 1.0
* Change schema checker to only support RAML 1.0 types

## 1.1.1

### Changes
* Updated styling for body descriptions

### Bugfixes
* Fixed bug where calls with empty responses where not rendered

## 1.1.0

### Features
* Added support for request bodies

### Changes
* Added key property to call parameters

## 1.0.3

### Bugfixes
* Fixed missing dependencies when building with syntax highlighter due to them only being dev-dependencies

## 1.0.2

### Bugfixes
* Corrected dev-dependencies to dependencies

## 1.0.1

### Bugfixes
* Fix missing parser issue

## 1.0.0

Initial release