export class Message {
    public _id: string;
    public subject: string;
    public body: string;
    public sender: any;
    public recipient: any;
    public timestamp: Date;
    public read: Boolean;
    public messages: Message[]
}