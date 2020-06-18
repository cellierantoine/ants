const stateSet = {
    IDLE : 0,
    MOVE : 1
}

class Mob{


    static mobList = [];

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.target;
        this.speed = 1;

        this.state = stateSet.IDLE;

        Mob.mobList.push(this);
    }

    minDistance(){
        let minD = Infinity;
        let target;

        for(let i = 0; i < Ressource.ressourceList.length; i ++){
            if(Ressource.ressourceList[i].tag == true){
                continue;
            }
            let d = distance(this.x, this.y, Ressource.ressourceList[i].x, Ressource.ressourceList[i].y)
            if( d < minD ){
                minD = d;
                target = Ressource.ressourceList[i];
            }
        }

        if(target != undefined){
            target.tag = true;
        }
        return target;
    }

    move(){
        if(Math.abs(this.x - this.target.x) < 0.5 && Math.abs(this.y - this.target.y) < 0.5){
            console.log("miamiam");
            for(let i = 0; i < Ressource.ressourceList.length; i ++){
                if (Ressource.ressourceList[i].equal(this.target.x, this.target.y)){
                    Ressource.ressourceList.splice(i, 1);
                    break;
                }
            }
            return stateSet.IDLE;
        }
        this.x += this.speed * cosinus(this.x, this.y, this.target.x, this.target.y);
        this.y += this.speed * sinus(this.x, this.y, this.target.x, this.target.y);
        return stateSet.MOVE;
    }

    act(){
        switch(this.state){
            case stateSet.IDLE:
                if(Ressource.ressourceList.length > 0){
                    this.target = this.minDistance();
                    if(this.target != undefined){
                        this.state = stateSet.MOVE;
                    }
                }
                break;
            case stateSet.MOVE:
                this.state = this.move();
                break;
        }
    }
}

