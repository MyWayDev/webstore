export class Product {

    constructor(
            public $key?:string,
            public productId?:string,
            public name?:string,
            public desc?:string,
            public price?:number,
            public bp?:number,
            public size?: string,
            public isNew?:boolean,
            public active?:boolean,
            public stock?:number,
            public productImg?:string,
            public promoImg?:string,
            public promoName?:string,
            public groupName?:string ){}

            /*get isAval(){
                return this.stock > 0 ;}*/

     static fromJsonProduct({ $key,productId,
                            name,desc,price,bp,size,isNew,
                            isActive,stock,productImg,promoImg,promoName,groupName}):Product {
                              return new Product ( $key,productId,
                                        name,desc,price,
                                        bp,size,isNew,isActive,
                                        stock,productImg,promoImg,promoName,groupName
                                        );

                             }

      static fromJsonProductList(productArray:any[]):Product[]{
          return productArray.map(Product.fromJsonProduct);
                                }
                             
      static fromJsonId({ productId
                          }):Product {return new Product ( productId);
                             }
                             

        static fromJsonIdList(productArray:any[]):Product[]{
          return productArray.map(Product.fromJsonId);
                                }
                                            
                     }
  
