# Email Boilerplate

Email boilerplate using [Mailchimp blueprints](https://github.com/mailchimp/email-blueprints), 
Gulp, Nunjucks and Sass. 

It generates the template-defined emails and optionaly inlines the styles
in the HTML.

## Setup

```sh
$ npm install
```

## Run

This will open your browser on the `dist` directory with the available email templates.

```sh
$ gulp
```

## Distribute

To generate templates with inline styles run

```sh
$ gulp dist
```

You should see the generated HTML files at `dist/inline`

## License

MIT © [Monoku](http://monoku.com) :heart: