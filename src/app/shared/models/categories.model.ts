export class Category {
    public id: number;
    public name: string;
    public image: string;
    public creationAt: string;
    public updatedAt: String;

    constructor(id: number, name: string, image: string, creationAt: string, updatedAt: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.creationAt = creationAt;
        this.updatedAt= updatedAt;
    }
}