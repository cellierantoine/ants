    class AStarPoint{
        constructor(x, y, g, h, parent){
            this.x = x;
            this.y = y;
            //Distance entre le sujet et le point
            this.g = g;
            //Distance entre la cible et le point
            this.h = h;
            this.heuristique = g+h;

            this.parent = parent;
        }

        lowerthan(aStarPoint){
            if(this.heuristique == aStarPoint.heuristique){
                return this.h < aStarPoint.h;
            }
            return this.heuristique < aStarPoint.heuristique;
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

        //Suppression et renvoi d'un element de la heap (par défaut le plus petit)
        remove(ind = 0){
            let aStarPoint = this.heap[ind];
            this.heap[ind] = this.heap[this.heap.length-1];
            this.heap.splice(this.heap.length-1, 1);
            let parentInd = Math.floor((ind-1)/2);
            if(ind == 0 || this.heap[parentInd].lowerthan(this.heap[ind])){
                this.reorderTopBot(ind);
            }else{
                this.reorderBotTop(ind);
            }
            return aStarPoint;
        }

        //Lors de l'ajout d'un element / suppression d'un element
        //depuis le bas vers le haut de la pile
        reorderBotTop(ind){
            if(ind != 0){
                let parentInd = Math.floor((ind-1)/2);
                if(this.heap[ind].lowerthan(this.heap[parentInd])){    
                    this.swap(ind, parentInd);
                    this.reorderBotTop(parentInd);
                }
            }
        }

        //Lors de la suppression du sommet / suppression d'un element
        //depuis le haut vers le bas de la heap
        reorderTopBot(ind){
            let child1 = this.heap[2*ind+1];
            let child2 = this.heap[2*ind+2];
            let indSwap;

            if(child1 == undefined && child2 == undefined){
                return;
            }else if(child2 == undefined){
                if(!this.heap[ind].lowerthan(child1)){    
                    indSwap = 2*ind+1;
                }else{
                    return;
                }
            }else{
                if(child1.lowerthan(child2)){    
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


    class AStar{
        static step = 5;
        static pointsInd = [[-1, -1], [-1, 0], [-1, +1], [+1, -1], [+1, 0], [+1, +1], [0, -1], [0, +1]]; 
        //static pointsInd = [[-1, 0], [+1, 0], [0, -1], [0, +1]]; 

        constructor(x, y, destX, destY){
            this.x = x;
            this.y = y;
            this.destX = destX;
            this.destY = destY;

            this.indX = Math.floor(x / AStar.step);
            this.indY = Math.floor(y / AStar.step);
            this.indDestX = Math.floor(destX / AStar.step);
            this.indDestY = Math.floor(destY / AStar.step);

            this.heap = new Heap();
            this.AStarPointList = [];
            this.trajectory = [[this.destX, this.destY]];

            this.AStarPointList[this.indX] = [];
            let aStarPoint = new AStarPoint(this.indX, this.indY, 0, 0, [this.indX, this.indY]);
            this.AStarPointList[this.indX][this.indY] = aStarPoint;
            this.heap.add(aStarPoint);
        }


        addPoints(x = this.indX, y = this.indY){
            if(x == this.indDestX && y == this.indDestY){
                return this.createTrajectory(this.indDestX, this.indDestY);
            }


            for(let i of AStar.pointsInd){
                let indPointX = x + i[0];
                let indPointY = y + i[1];
                let pointX = indPointX * AStar.step;
                let pointY = indPointY * AStar.step;
                
                let distBegin = distance(this.indX, this.indY, indPointX, indPointY);
                let distEnd = distance(this.indDestX, this.indDestY, indPointX, indPointY);

                
                if(this.AStarPointList[indPointX] == undefined){
                    this.AStarPointList[indPointX] = [];
                }
                if(this.AStarPointList[indPointX][indPointY ] == undefined){
                    if(Obstacle.collide(pointX, pointY)){
                        this.AStarPointList[indPointX][indPointY] = 1;
                    }else{
                        let aStarPoint = new AStarPoint(indPointX, indPointY, distBegin, distEnd, [x, y]);
                        this.AStarPointList[indPointX][indPointY] = aStarPoint;
                        this.heap.add(aStarPoint);
                    }
                } 
            }

            let newPoint = this.heap.remove();
            this.addPoints(newPoint.x, newPoint.y);

        }

        createTrajectory(x, y){
            let tx;
            let ty;
            while(!(x == this.indX && y == this.indY)){
                this.trajectory.unshift([x * AStar.step, y * AStar.step]);

                tx = this.AStarPointList[x][y].parent[0];
                ty = this.AStarPointList[x][y].parent[1];

                x = tx; 
                y = ty;
            }
            this.trajectory.unshift([x * AStar.step, y * AStar.step]);
            return this.trajectory;
        }

    }