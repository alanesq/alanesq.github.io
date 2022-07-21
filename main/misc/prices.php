<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head><title>Alan's price check page</title></head><body style="color: rgb(0, 0, 0); background-color: yellow;" alink="#000099" link="#000099" vlink="#990099">
<div style="text-align: center;"><big style="text-decoration: underline;"><big><span style="color: rgb(204, 0, 0);">Alan's Price Check Page</span></big></big><br>
<br>
</div>

<table style="text-align: left; width: 70%; height: 100%; margin-left: auto; margin-right: auto;" border="0" cellpadding="2" cellspacing="2">

  <tbody>
    <tr>
      <td style="vertical-align: top; width: 50%; background-color: rgb(255, 204, 102);"><span style="color: black; text-decoration: underline;">Tesco</span><br>
<?php // Grab price from Tesco web site
	
	// Tesco product info
        //  url, title, buy price
                // Tesco
		findprice("http://www.tesco.com/groceries/Product/Details/?id=253347801","Mushy peas","0.09");   
		findprice("http://www.tesco.com/groceries/Product/Details/?id=274578564","Onion sausages","1.10"); 
		findprice("http://www.tesco.com/groceries/Product/Details/?id=263123095","Std sausages","1.10");
              
	
	// Procedure to Find price from Tesco web site
		function findprice($ttweb,$ttname,$ttbuy) 
		{
			// Grab web page	
			$open=fopen("$ttweb","rb");
			$webpage=stream_get_contents($open);
			fclose($open);

			// Extract price from web page
			$pos = strpos($webpage,"linePrice");    // find location of "linePrice" on the page
		        // echo "<p>Loci=$pos </p>";
			// echo "<p>$webpage </p>";
			$ttprice = substr($webpage,$pos +13,4);
		
			// Display result
			if ($pos === false) 
			{
			  echo "<p>$ttname not found</p>";
			} 
			else 
			{
                          if ($ttprice < $ttbuy) echo "<span style='color: rgb(204, 0, 0)'>";
			  echo "<p>$ttname £$ttprice </p>";
                          if ($ttprice < $ttbuy) echo "</color>";
			}
		}

?><br>
      </td>
      <td style="vertical-align: top; background-color: rgb(153, 255, 153);"><span style="text-decoration: underline;">Links</span><br>
      <br>
      <a href="http://www.mysupermarket.co.uk/#/asda-compare-prices/tinned_vegetables/asda_smartprice_mushy_peas_300g.html" target="_blank">Mushy peas</a><br>
      <br>
      <a href="http://www.mysupermarket.co.uk/#/asda-compare-prices/fresh_vegetarian_food/linda_mccartney_vegetarian_sausages_6_per_pack_300g.html" target="_blank">Sausages (Std)</a><br>
      <br>
      <a href="http://www.mysupermarket.co.uk/#/asda-compare-prices/frozen_vegetarian/linda_mccartney_red_onion_and_rosemary_vegetarian_sausages_6_per_pack_300g.html" target="_blank">Sausages (Onion)</a><br>
      <br>
      <a href="http://www.tesco.com/groceries/product/search/default.aspx?searchBox=everyday+value&amp;newSort=true&amp;search.x=25&amp;search.y=14" target="_blank">Tesco value items</a><br>
<br>
      </td>
    </tr>
    <tr>
      <td style="vertical-align: top;"><br>
      </td>
      <td style="vertical-align: top;"><br>
      </td>
    </tr>
  </tbody>
</table>

<br>

<div style="text-align: center;"><a href="http://www.alanesq.com" target="_top">alanesq.com</a><br>
</div>

</body></html>