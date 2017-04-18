export class Promo {
    constructor(
        public $key:string,
        public promoName:string,
        public promoImg:string

    ){}
    static fromJsonPromo({$key,promoName,promoImg}):Promo{
            return new Promo($key,promoName,promoImg)
    };
    static fromJsonPromoArray(promoArray:any[]):Promo[]{
            return promoArray.map(Promo.fromJsonPromo)
    };
}
