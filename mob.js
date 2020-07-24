const stateSet = {
    IDLE : 0,
    MOVE : 1,
    SEEK : 2
}

class Mob{


    static mobList = [];

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.target;
        this.speed = 1;

        this.state = stateSet.IDLE;

        this.route = [];

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
        //Arrivée à la ressource.
        if(Math.abs(this.x - this.target.x) < 0.5 && Math.abs(this.y - this.target.y) < 0.5){
            for(let i = 0; i < Ressource.ressourceList.length; i ++){
                if (Ressource.ressourceList[i].equal(this.target.x, this.target.y)){
                    Ressource.ressourceList.splice(i, 1);
                    break;
                }
            }
            return stateSet.IDLE;
        }


        if((this.route[0][0] == this.x && this.route[0][1] == this.y) 
        || (Math.abs(this.x - this.route[0][0]) < 1 && Math.abs(this.y - this.route[0][1]) < 1)){
            this.route = this.route.splice(1);
            return stateSet.MOVE;        
        }

        let tx = this.x;
        let ty = this.y;

        this.x += this.speed * cosinus(tx, ty, this.route[0][0], this.route[0][1]);
        this.y += this.speed * sinus(tx, ty, this.route[0][0], this.route[0][1]);

        return stateSet.MOVE;
    }

    act(){
        switch(this.state){
            case stateSet.IDLE:
                if(Ressource.ressourceList.length > 0){
                    this.target = this.minDistance();
                    if(this.target != undefined){
                        this.state = stateSet.SEEK;
                    }
                }
                break;
            case stateSet.SEEK:
                let aStarAlgo = new AStar(this.x, this.y, this.target.x, this.target.y);
                aStarAlgo.addPoints();
                this.route = aStarAlgo.trajectory;
                this.state = stateSet.MOVE;
                break;    
            case stateSet.MOVE:
                this.state = this.move();
                break;
        }
    }
}

