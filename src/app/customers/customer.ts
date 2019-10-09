export class Customer {
    public firstName = '';
    public lastName = '';
    public email = '';
    public sendCatlog: false;
    public addressType = "home";
    public street1?: string;
    public street2?: string;
    public city?: string;
    public state?: string;
    public zip?: string
    constructor() { }
}