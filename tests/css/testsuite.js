casper.
  start( './src/html/index.html' ).
  then(function(){
    phantomcss.screenshot('#sample', 'Button');
  });

casper.run();