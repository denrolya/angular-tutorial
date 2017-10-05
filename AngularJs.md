# AngularJs Tutorial

## Table of contents
* [What is angularJs](#angular)
* [Angular module](#module)
	* [Behind the scenes](#behind-the-scenes)
	* [.config().run()](#config-run)
* [Controllers & scopes](#controllers-and-scopes)
	* [Self executing anonymous functions(SEAF) & 'use strict'](#seaf)
	* [Controller and it's scope](#scope)
	* [Nesting](#nesting)
	* [$scope vs vm](#scope-vs-vm)
	* [$rootScope](#rootScope)
* [States & directives](#states-and-directives)
	* [ui-router description](#ui-router-description)
	* [What is state](#state)
	* [Basic state example](#state-example-basic)
	* [State nesting](#state-nesting)
 	* [HTML5 mode](#html5-mode)
* [Directives](#angular-directives)
	* [Native directives](#native-directives)
	* [Normalization](#normalization)
	* [Directive types](#directive-types)
	* [Custom directive](#custom-directive)
* [Services](#services)
	* [Basic service](#basic-service)
	* [Other injectables](#other-injectables)
		* [Constant](#constant)
		* [Value](#value)
	
---
## <a name="angular"></a>What is angularJs
Unlike *jQuery* that we all used to use in our projects *AngularJs* is a framework which eases the work with most common tasks you previously required *jQuery* for. It was specifically designed to help developers build SPAs in accordance with best practices for web development. Some of the key features *AngularJS* adds on top of *jQuery* are:

* Angular directives (extension to HTML)
* Templating
* Dependency injection
* Two-way data binding
* Support for MVC LINK TO SECTION
* RESTful API
* Form validation

It goes without saying that *AngularJS* also abstracts the DOM, has a system for managing event handlers, and supports AJAX/JSONP.

And I'm really keen on writing code that can be called clean, that doesn't contain repetitions, that is reusable and, in case of front-end, that looks cooler than just a simple set of javascript files with jQuery in them. Having the smart architecture without going too complex, where every single piece of JS code has it's own and its very own purpose. I also don't like frontend development, I have to say that, but working with *AngularJS* so far - sometimes it brings me peace and happiness as of coding terms

---

## <a name="module"></a>Angular Module
Here's the basic example of a module:

    <div ng-app="hello">
        <p>{{ 'Hello World!' }}</p> <!-- Equals to <p>Hello world!</p> -->
    </div>

### <a name="behind-the-scenes"></a>Behind the scenes
When talking in *AngularJs* terms, `ng-app` is something that we call a directive. It is the very main directive because it declares a module which you are working on | in.
> You can think of a module as a container for the different parts of your app – controllers, services, filters, directives, etc. [Link](https://docs.angularjs.org/guide/module)
    
This is how you declare your new module:
        
        angular.module('hello', []); // Notice the empty sqare brackets
### <a name="config-run"></a>.config().run()
When you declare a module, you might consider using the **.config()** and **.run()** and they can be attached to new modue as so:

    var app = angular // We'll be using it in our future references
        .module(...)
        .config(function(injections) {})
        .run(function(injections) {}) 
The order of these 2 functions doens't matter & you can invoke them more then one time in your code. 

Normally your would use **.confg()** to configure dependencies you have in your module, for instance set up your router having you're using `ui-router` module from angular(which we are). Only providers(±objects without business logic, configurational) and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.

**.run()** gets executed after the injector is created and are used to kickstart the application. Only instances and constants can be injected into run blocks. This is to prevent further system configuration during application run time.

---

## <a name="controllers-and-scopes"></a>Controllers & scopes

### <a name="seaf"></a>Self executing anonymous functions(SEAF) & 'use strict'
It is presumed as the best practice to wrap all of your code parts into SEAF. The use of it creates a closure which prevents access to the variables and functions that it contains.

    (function() {
        'use strict';
        
        var test = 'hello';
        
        function alertTest() { alert(test); }
    })();
    alert(test); // ReferenceError: test is not defined
    alertTest(); // ReferenceError: alertTest is not defined
    
Notice the `'use strict';` directive that tells the browser to execute JavaScript in a strict mode. Strict mode changes previously accepted "bad syntax" into real errors. List of thing that are not allowed using strict mode can be found here: [Link](https://www.w3schools.com/js/js_strict.asp)

### <a name="scope"></a>Controller and it's scope
Scope is the glue between application controller and the view. Scope is an object that refers to the application model. Scopes are arranged in hierarchical structure which mimic the DOM structure of the application. Scopes can watch expressions and propagate events. Let's see an example using controllers and manipulating it's scope: [Plunkr](https://embed.plnkr.co/wWSMCMmnSfzk2WAiVRGK/)

    HTML:
        <div ng-app="hello" ng-controller='TestController'>
            <input type="text" ng-model="name" />
            <p>Hello {{ name }}</p>
        </div>
    
    JavaScript behind it:
        app
            .controller('TestController', ['$scope', function TestController($scope) {
                $scope.name = 'World!';
            }]);
### <a name="nesting"></a>Nesting
`$scope.name` is declared in `MainCtrl` as 'World'. The following will result into error, since as mentioned previously, scopes refer to application model which is defined only in Main controller but not into SubCtrl. In other words every controller has it's own scope

    <body ng-controller="MainCtrl">
        <p>Hello {{name}}!</p>
        
        <div ng-controller="SubCtrl">
            <p>Hello {{ name }}!</p>
        </div>
    </body>

### <a name="scope-vs-vm"></a>`$scope` vs `vm`
Let's check another example of nested scopes: [Plunkr](https://embed.plnkr.co/WeyGb0hyiiPppbry8djB/).

So some pros of using `vm` syntax

* Provides a consistent and readable method of creating bindings in my controllers
* Removes any issues of dealing with `this` scoping or binding (i.e. closures in nested functions)
* Removes `$scope` from the controller unless I explicitly need it for something else

Further reading:
[angular.exports instead of vm](https://toddmotto.com/a-better-way-to-scope-angular-extend-no-more-vm-this/)

### <a name="rootScope"></a>`$rootScope`
> Every application has a single root scope. All other scopes are descendant scopes of the root scope.

Using root scope can give you an advantage when you store, for instance, your global parameters there, or using global events. As every other dependency it get's injected as follows:

    app
        .controller('SomeController', ['$rootScope', function($rootScope...

The root scope can be also used in templates gloablly. For instance, we have a module called *app*, then having a couple of states with nesting, let's say at it's lowest state eg *app.home.basic* we have a controller *SomeController*:

	app
		.controller('SomeController', ['$scope', function($scope) {
			$scope.currentTheme = 'Root Scopes';
		}]);
		
And in template:
	
	<h1>{{ tutorialTheme }}</h1
	<h2>{{ currentTheme }}<h2>
	
So having tutorialTheme defined elswhere with `$rootScope.tutorialTheme = 'Angular tutorial';` we can safely use it in our templates. Cons and Pros...

---

## <a name="states-and-directives"></a>States & directives

### <a name="ui-router description"></a>ui-router-description
>Angular UI-Router is a client-side Single Page Application routing framework for AngularJS.

>Routing frameworks for SPAs update the browser's URL as the user navigates through the app. Conversely, this allows changes to the browser's URL to drive navigation through the app, thus allowing the user to create a bookmark to a location deep within the SPA.

>UI-Router applications are modeled as a hierarchical tree of states. UI-Router provides a >state machine to manage the transitions between those application states in a transaction-like manner.

### 	<a name="state"></a>What is state
Simply, think of a state as a page of your application. For instance: //facto.loc/admin/post/list means that you are in the post admin listing state. Each state can have url, controller attached, have it's own template, resolve dependencies, have ancestors. Let's look at it with examples.

### <a name="basic-state-example"></a>Basic state example
For this and futher examples we gonna be needing code on your local machine.
`git clone https://github.com/denrolya/angular-tutorial.git`

### <a name="state-nesting"></a>State nesting
EXAMPLE FIRST

Child states DO inherit the following from parent states:

 * Resolved dependencies via resolve
 * Custom data properties

**Nothing else is inherited (no controllers, templates, url, etc).**

### <a name="html5-mode"></a>HTML5 mode
By default, *AngularJS* will route URLs with a hashtag. But in case you want to have pretty url's you have to do 3 things:

1. Set `$locationProvider.html5Mode(true);` in config.
2. Set base for relative links by simply adding `base href="/url" >` into the head of your *HTML* layout
3. Make your server able to respond to those requests.

---

## <a name="directives"></a>Directives

### <a name="native-directives"></a>Native directives
We've already met a couple of them: `ui-view`, `ng-model` - these are all directives made by angular. there 

>At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its children.

HTML5 allows custom attributes as long as they are prefixed with `data-`. So valid `ng-model` for HTML5 will be obviously `data-ng-model`. Since it doesn't play very big role, we gonna be using simple notation without the `data-` prefix.

### <a name="normalization"></a>Normalization
AngularJS normalizes an element's tag and attribute name to determine which elements match which directives. We typically refer to directives by their case-sensitive camelCase normalized name (e.g. ngModel). However, since HTML is case-insensitive, we refer to directives in the DOM by lower-case forms, typically using dash-delimited attributes on DOM elements (e.g. ng-model).

The normalization process is as follows:

* Strip x- and data- from the front of the element/attributes.
* Convert the :, -, or _-delimited name to camelCase.

For example, the following forms are all equivalent and match the ngBind 

* `<span ng-bind="name"></span>`
* `<span ng:bind="name"></span>`
* `<span ng_bind="name"></span>`
* `<span data-ng-bind="name"></span>`
* `<span x-ng-bind="name"></span>`

### <a name="directives-types"></a>Directive types
There are 4 types of directives in AngularJs:

1. Element names (E) - allows you to create custom elements like `<date-picker/>` or `<data table></data-table>`
2. Attributes (A) - allows you to use custom attributes on html elements like `<div date-picker></div>` or `<span lorem="400"></span>`
3. Class names (C)
4. Comments (M)

TBF I'm not familiar with the latter two types, never used them and moreover never seen anyone using them. But you can explore it here: [Link](https://www.w3schools.com/angular/angular_directives.asp).

### <a name="custom-directive"></a>Custom directive
Directives are good if you follow DRY principals. It is the right tool to abstract bit's of reusable code into an "object" with it's separate "scope". OK, the example...

---

## <a name="services"></a>Services
Services in *AngularJs* are no different concept from other frameworks. This is just a simple class, function that creates object or function in this case, that represents the service to the rest of the application. Without further ado let's create our first service.

### <a name="basic-service"></a>Basic service
	app
		.module('app')
		.factory('ArticleService', ArticleService);
		
	ArticleService.$inject = ['$http']; // How is this even possible in strict mode??
	function ArticleService($http) {
		var service = this;
		
		service.getArticles = function() {
			return $http.get('/api/articles').then(function successCallback(response) {
				return response.articles;
			}, function errorCallback(error) {
				alert(error.message);
			});
		}
		
		return service;
	}

### <a name="other-injectables"></a>Other injectables


#### <a name="constant"></a>Constant
Obviously you can guess what it is:

	app.constant('TEST_CONSTANT', "Constant value")
	
#### <a name="value"></a>Value
	app.value('testValue', 666);
Unlike constants, values can be changed.


