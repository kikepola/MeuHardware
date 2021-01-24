const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

module.exports = class Terabyte{

   async run(storeUrl, productUrl, id_data){

      const browser = await puppeteer.launch({
         headless: false,
         defaultViewport: null, 
         args: ['--start-maximized'] 
      });
    
      const page = await browser.newPage();
      await page.goto(storeUrl);
    
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
                     link: element.getElementsByTagName("a")[0].href                           
                  }
               )
            }        
         })    
         return productsList
      });
       
      var result = await products
    
      result.forEach(async (product) => {

         var productData = {
            id_data: id_data,
            name: product.name,
            image: product.image,
            price: product.price,
            link: product.link,
            store_name: "Terabyte"
         }
         console.log(productData)

         await fetch(productUrl, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
         }).then(() => console.log("OK!"))
         .catch((error) => console.log(error))
      });
    
      await browser.close();    
   }

}
