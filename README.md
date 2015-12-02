# bootstrap-sass-gulp
Bootstrap Sass with Gulp compilation, minification, autoprefixing, and styleguide generation.

Install Gulp globally `npm install -g gulp`

Install node dependencies `npm install`
Install bower dependencies `bower install`

Run default Gulp task with `gulp`. This task will watch source files within the **src** and compile CSS and JavaScript files for running the application.

Run Gulp task `gulp build:prod` to compile, concat, and minify production ready files.

### Folder Structure

#### SRC

This folder contains source Sass, JavaScript, HTML, and images. Changes to assets should be done within this folder.

#### DEV

This folder contains compiled non-minified files used to run application

#### DIST

This folder contains compiled production assets including minified HTML, CSS, JavaScript, and images.