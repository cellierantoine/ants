class Obstacle{
    static obstacleList = [];

    constructor(x, y, dx, dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        Obstacle.obstacleList.push(this);
    }

    static collide(x, y){
        for(obstacle of Obstacle.obstacleList){
            if(obstacle.x < x && (obstacle.x + obstacle.dx) > x 
            && obstacle.y < y && (obstacle.y + obstacle.dy) > y){
                return true;
            }
        }
        return false;
    }
}