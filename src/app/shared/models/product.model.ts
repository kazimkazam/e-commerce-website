interface Category {
    id: number,
    name: string,
    image: string
};

export class Product {
    public id: number;
    public title: string;
    public price: number;
    public description: string;
    public category: Category;
    public images: string[];

    constructor(id: number, title: string, price: number, description: string, category: Category, images: string[]) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.images = images;
    }
};