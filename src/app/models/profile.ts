export class Profile {
    constructor(
        public $key?:string,
        public distrId?:string,
        public id?:string,
        public name?:string,
        public isAdmin?:boolean,
        public area?:string
    ){}

    static fromJsonProfile({$key,distrId,id,name,isAdmin,area}):Profile{
                            return new Profile($key,distrId,id,name,isAdmin,area)
                                               };

    static fromJsonProfileArray(profileArray:any[]):Profile[]{
                                return profileArray.map(Profile.fromJsonProfile)
           };
}