
export class Group {
    constructor(
        public $key:string,
        public groupName:string,
        public groupImg:string
    ){}

    static fromJsonGroup({$key,groupName,groupImg}):Group{
                            return new Group($key,groupName,groupImg)
                                               };

    static fromJsonGroupArray(groupArray:any[]):Group[]{
                                return groupArray.map(Group.fromJsonGroup)
           };
}


