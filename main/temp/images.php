<html>
 <head>
 <title>display all image in folder</title>
 </head>
 <body>
 
        <center>
        <H1>Images</H1>
 
	<?php
	
          $cntr = 0;
          $images = glob("*.jpg");
          foreach($images as $image) {
            $cntr = $cntr + 1;
            echo $cntr.' <img width="640" src="'.$image.'" /><br><br>';
          }	
 
	?>  
	
 </body>
 </html>
 
