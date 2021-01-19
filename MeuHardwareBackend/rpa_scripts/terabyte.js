const puppeteer = require('puppeteer');

module.exports = class Terabyte{

   async run(link){

      const browser = await puppeteer.launch({
         headless: false,
         defaultViewport: null, 
         args: ['--start-maximized'] 
      });
    
      const page = await browser.newPage();
      await page.goto(link);
    
      var products = await page.evaluate(() => {
         var productsList = []
         var elements = document.getElementById("prodarea").getElementsByClassName("commerce_columns_item_inner")
    
         Array.from(elements).forEach((element) => {
            if(element.getElementsByClassName("tbt_esgotado")[0] == undefined){
    
               var price = element.getElementsByClassName("prod-new-price")[0]
               .getElementsByTagName("span")[0].innerText.replace("R$", "")
    
               price = price.replace(".", "")
               price = price.replace(",", ".")
               price = price.replace(" ", "")
    
               productsList.push(
                  {               
                     name: element.getElementsByTagName("a")[0].title.replace(",", ""), 
                     image: element.getElementsByTagName("img")[0].src,
                     price: price,
                     href: element.getElementsByTagName("a")[0].href             
                  }
               )
            }        
         })    
         return productsList
      });
       
      var result = await products
    
      result.forEach((product) => {
        //setConnection(product, id_data)
      });
    
      await browser.close();    
   }

}
