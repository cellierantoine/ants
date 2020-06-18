class AStarPoint{
    static step = 10;

    constructor(x, y, heuristique = 0){
        this.x = x;
        this.y = y;
        this.heuristique = heuristique;
    }
}

class Heap{
    constructor(){
        this.heap = [];
    }

    add(aStarPoint){
        let ind = this.heap.length;
        this.heap.push(aStarPoint);
        this.reorderBotTop(ind);
    }

    pop(){
        let aStarPoint = this.heap[0];
        this.heap[0] = this.heap[this.heap.length-1]
        this.heap.splice(this.heap.length-1, 1);
        this.reorderTopBot(0);

        return aStarPoint;
    }

    //Lors de l'ajout d'un element
    reorderBotTop(ind){
        if(ind != 0){
            let parentInd = Math.floor((ind-1)/2);
            if(this.heap[ind].heuristique < this.heap[parentInd].heuristique){
                this.swap(ind, parentInd);
                this.reorderBotTop(parentInd);
            }
        }
    }

    //Lors de la suppression d'un element
    reorderTopBot(ind){
        let child1 = this.heap[2*ind+1];
        let child2 = this.heap[2*ind+2];
        let indSwap;

        if((child1 == undefined && child2 == undefined) 
        || (this.heap[ind].heuristique < child1.heuristique && this.heap[ind].heuristique < child2.heuristique)){
            return;
        }else if(child1 == undefined){
            if(this.heap[ind].heuristique > child2.heuristique){
                indSwap = 2*ind+2;
            }else{
                return;
            }
        }else if(child2 == undefined){
            if(this.heap[ind].heuristique > child1.heuristique){
                indSwap = 2*ind+1;
            }else{
                return;
            }
        }else{
            if(child1.heuristique < child2.heuristique){
                indSwap = 2*ind+1;
            }else{
                indSwap = 2*ind+2
            }
        }
        this.swap(ind, indSwap);
        this.reorderTopBot(indSwap);
    }

    swap(ind1, ind2){
        let tmp = this.heap[ind1];
        this.heap[ind1] = this.heap[ind2];
        this.heap[ind2] = tmp;
    }
}

function AStar(){
    let AStarPointList = [];

}