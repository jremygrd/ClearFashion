// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const dedicatedbrand = require('./sources/dedicatedbrand');
const mudjeans = require('./sources/MudJeans');
const adresseParis = require('./sources/adresseparis')

let all = [{'importfunc':dedicatedbrand,'src':'https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fsweat'},
            {'importfunc':mudjeans,'src':'https://mudjeans.eu/collections/men'},
            {'importfunc':adresseParis,'src':'https://adresse.paris/630-toute-la-collection?id_category=630&n=109'}
]

let allpr = []
async function sandbox (importfunc,eshop,res) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products = await importfunc.scrape(eshop);
    console.log(products.length);
    allpr.push(products)
    console.log('done');
    if(eshop == all[all.length-1].src){
      res.status(200).json({ products: allpr })
    }
  } catch (e) {
    console.error(e);
  }
}

async function getAll(res){
  allpr = []
  all.forEach(element => {
  sandbox(element.importfunc,element.src,res)
  });
}

export default async function(req, res){
  let pr = await getAll(res)
}
