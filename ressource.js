class Ressource{
    static ressourceList = [];

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.tag = false;

        Ressource.ressourceList.push(this);
    }

    equal(x, y){
        return this.x == x && this.y == y;
    }
}

