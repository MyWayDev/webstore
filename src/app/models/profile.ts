export class Profile {
    constructor(
        public $key?:string,
        public distrId?:string,
        public id?:string,
        public name?:string
    ){}

    static fromJsonProfile({$key,distrId,id,name}):Profile{
                            return new Profile($key,distrId,id,name)
                                               };

    static fromJsonProfileArray(profileArray:any[]):Profile[]{
                                return profileArray.map(Profile.fromJsonProfile)
           };
}