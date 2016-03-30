eslint/rules
============


Using these rules
-----------------

ESLint does not currently support a way to bundle configuration with extra
rules. They will eventually extend plugins so they can be shipped with
configuration.

https://github.com/eslint/eslint/issues/3458

Because they intend to do this, they said they would deprecate the
`--rulesdir` command-line option in 2.0.0. Though there's no evidence it's
been deprecated in the documentation:

http://eslint.org/docs/user-guide/command-line-interface#rulesdir
http://eslint.org/docs/developer-guide/working-with-rules#runtime-rules

When they get around to defining a plugin format that can include
configuration, maybe it will be worth reworking this repository to separate
the eslint bits and the scss bits.

Until then, reworking this repo &ndash; which would involve renaming it to
something that starts with `eslint-plugin-`! &ndash; seems pointless.

Oh. They won't implement a configuration option for `--rulesdir`. Because they
don't want people to use it anymore.

https://github.com/eslint/eslint/issues/2715
https://github.com/eslint/eslint/issues/2180

So, let's use

```
--rulesdir node_modules/bodylabs-javascript-style/eslint/rules
```

and call it a day.


Testing
-------

To run one of the tests:

```
npm install eslint
node eslint/rules/bodylabs-example-rule.spec.js
```


Upstream
--------

We experiment with rules here before we invest in contributing them upstream.
