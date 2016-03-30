### In a multi-line lambda, use a block

In Kyle Simpson's ES6 book, which I've almost finished, he recommends [using arrow functions only when they're really needed](https://github.com/getify/You-Dont-Know-JS/blob/6a88e6e905b4f80f0dc3ae36a64e641079b543b9/es6%20%26%20beyond/ch2.md#not-just-shorter-syntax-but-this), not just to avoid typing `function` all the time. I respectfully disagree with him. His counterexample is an object filled up with arrow-created lambdas, which does not handle `this` as you would expect. While admittedly this is an arrow-function gotcha, I think his example is just a good place to use [concise methods](https://github.com/getify/You-Dont-Know-JS/blob/6a88e6e905b4f80f0dc3ae36a64e641079b543b9/es6%20%26%20beyond/ch2.md#concise-methods), not arrow functions.

He also writes:

> [...] the trained eye that is so used to hunting for the word function in code to find scope boundaries now needs to look for the `=>` marker, which can definitely be harder to find in the thick of the code.

And:

> The longer the function, the less `=>` helps; the shorter the function, the more `=>` can shine.

I think he is partially right.

A function written in ES5 like this …

```js
foo(function (result) {
    bar({
        foo: result,
        baz: 'inga',
    });
});
```

… seems difficult to parse visually with the fat arrow …

```js
foo((result) => bar({
    foo: result,
    baz: 'inga',
}));
```

… and better written like this …

```js
foo((result) => {
    bar({
        foo: result,
        baz: 'inga',
    });
});
```

… or on a single line …

```js
foo((result) => bar({ foo: result, baz: 'inga' }));
```

Some examples:

```js
var addListener = function (thing, other) {
    thing.addEventListener(function () { doSomething({ context: other }, 1000)); });
};

var addListner = function (thing, other) {
    thing.addEventListener(() => doSomething({ context: other }, 1000));
};

var addListener = function (thing, other) {
    thing.addEventListener(() => {
        doSomething({
            context: other,
            result: transform(thing, {
                attrs: { foo: 1, bar: 2, baz: 3 },
            }),
        }, 1000);
    });
};

var addListener = function (thing, other) {
    thing.addEventListener(() =>
        doSomething({
            context: other,
            result: transform(thing, {
                attrs: { foo: 1, bar: 2, baz: 3 },
            }),
        }, 1000));
};
```
