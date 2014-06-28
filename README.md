jquery-pagechange
=================

jquery-pagechange is a small script to make any website loading it´s content via AJAX

Requirements:

- jQuery 2.1.x

Usage

place the script tag at the end of your <body> tag.

    <script src="js/pagechange.js"></script>

Init the Script BEFORE load

    <script>
      $('#cwrap').zz_page();
    </script>

Call the plugin on the wrapping element of your website


Additional parameters:

- triggerElement: the selector for your hyperlinks (default: 'a[href]:not([target="_blank"])')
- content.wrap: the wrapper for a single page (default: '.main_content')
- showfunction: the animation function for fading out/in the pages (params: newPage = the new page you have to make visible)

Markup

In addition to make everything work all your main content should be wrapped in an element (the stuff between menu and footer)

    <body >
      <div class="nav">
      <a>some navigation</a>
      </div>
  
      <div id="cwrap">
  
        <div class="main_content">
          <h1>Your content</h1>
        </div>
  
      </div>
    </body>
