/**
 * Баллистический калькулятор - анимация полета
 */

class BallisticAnimation {
    constructor() {
        this.canvas = document.getElementById('coordinateCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.trajectory = [];
        this.animationFrame = null;
        this.currentPointIndex = 0;
        this.isAnimating = false;
        this.trailPoints = [];
        
        this.padding = 70;
        this.canvas.width = 900;
        this.canvas.height = 500;
        this.originX = this.padding;
        this.originY = this.canvas.height - this.padding;
        this.width = this.canvas.width - this.padding * 2;
        this.height = this.canvas.height - this.padding * 2;
        
        this.scaleX = 1;
        this.scaleY = 1;
        this.maxRange = 100;
        this.maxHeight = 50;
        
        this.init();
    }
    
    init() {
        this.drawCoordinateSystem();
    }
    
    drawCoordinateSystem() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGridAndTicks();
        this.drawAxes();
        this.drawArrows();
        this.drawLabels();
    }
    
    drawAxes() {
        this.ctx.save();
        this.ctx.strokeStyle = '#DFD0B8';
        this.ctx.lineWidth = 2.5;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY);
        this.ctx.lineTo(this.originX + this.width, this.originY);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY);
        this.ctx.lineTo(this.originX, this.originY - this.height);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    drawArrows() {
        this.ctx.save();
        this.ctx.fillStyle = '#DFD0B8';
        const arrowSize = 8;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX + this.width, this.originY);
        this.ctx.lineTo(this.originX + this.width - arrowSize, this.originY - arrowSize / 2);
        this.ctx.lineTo(this.originX + this.width - arrowSize, this.originY + arrowSize / 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY - this.height);
        this.ctx.lineTo(this.originX - arrowSize / 2, this.originY - this.height + arrowSize);
        this.ctx.lineTo(this.originX + arrowSize / 2, this.originY - this.height + arrowSize);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawLabels() {
        this.ctx.save();
        this.ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
        this.ctx.fillStyle = '#DFD0B8';
        this.ctx.fillText('Расстояние X (м)', this.originX + this.width - 100, this.originY + 30);
        this.ctx.fillText('Высота Y (м)', this.originX - 50, this.originY - this.height - 10);
        this.ctx.font = '12px "Segoe UI", Arial, sans-serif';
        this.ctx.fillText('0', this.originX - 15, this.originY + 5);
        this.ctx.restore();
    }
    
    drawGridAndTicks() {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(223, 208, 184, 0.2)';
        this.ctx.lineWidth = 0.8;
        
        const step = Math.min(100, this.width / 5);
        const tickLength = 6;
        
        for (let x = this.originX + step; x < this.originX + this.width; x += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.originY);
            this.ctx.lineTo(x, this.originY - this.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.originY - tickLength / 2);
            this.ctx.lineTo(x, this.originY + tickLength / 2);
            this.ctx.stroke();
        }
        
        for (let y = this.originY - step; y > this.originY - this.height; y -= step) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.originX, y);
            this.ctx.lineTo(this.originX + this.width, y);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.originX - tickLength / 2, y);
            this.ctx.lineTo(this.originX + tickLength / 2, y);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    updateTrajectory(trajectory, maxRange, maxHeight) {
        console.log("updateTrajectory called with", trajectory.length, "points");
        console.log("First point:", trajectory[0]);
        console.log("Last point:", trajectory[trajectory.length - 1]);
        
        this.trajectory = trajectory;
        this.maxRange = Math.max(maxRange, 10);
        this.maxHeight = Math.max(maxHeight, 10);
        this.scaleX = this.width / this.maxRange;
        this.scaleY = this.height / this.maxHeight;
        this.currentPointIndex = 0;
        this.trailPoints = [];
        
        this.scrollToGraph();
        this.drawFullTrajectory();
        
        setTimeout(() => {
            this.startAnimation();
        }, 500);
    }
    
    scrollToGraph() {
        const graphContainer = document.querySelector('.graph-container');
        if (graphContainer) {
            const offset = 80;
            const elementPosition = graphContainer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
    
    drawFullTrajectory() {
        if (!this.trajectory || this.trajectory.length < 2) return;
        
        this.drawCoordinateSystem();
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        let firstPoint = true;
        for (const point of this.trajectory) {
            const x = this.originX + point.x * this.scaleX;
            const y = this.originY - point.y * this.scaleY;
            
            if (firstPoint) {
                this.ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }
    
    drawTrail() {
        if (!this.trailPoints || this.trailPoints.length < 2) return;
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#3498db';
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = '#3498db';
        
        let firstPoint = true;
        for (const point of this.trailPoints) {
            const x = this.originX + point.x * this.scaleX;
            const y = this.originY - point.y * this.scaleY;
            
            if (firstPoint) {
                this.ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }
    
    drawProjectile(point) {
        if (!point) return;
        
        const x = this.originX + point.x * this.scaleX;
        const y = this.originY - point.y * this.scaleY;
        
        if (x >= this.originX && x <= this.originX + this.width &&
            y >= this.originY - this.height && y <= this.originY) {
            
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#e74c3c';
            
            this.ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 8, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#e74c3c';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.beginPath();
            this.ctx.arc(x - 1.5, y - 1.5, 2, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(x - 1, y - 1, 1, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.shadowBlur = 0;
        }
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        if (!this.trajectory || this.trajectory.length === 0) {
            console.log("No trajectory to animate");
            return;
        }
        
        console.log("Starting animation with", this.trajectory.length, "points");
        this.isAnimating = true;
        this.currentPointIndex = 0;
        this.trailPoints = [];
        this.animate();
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        if (this.currentPointIndex >= this.trajectory.length) {
            console.log("Animation finished");
            this.stopAnimation();
            return;
        }
        
        const currentPoint = this.trajectory[this.currentPointIndex];
        this.trailPoints.push(currentPoint);
        
        this.drawCoordinateSystem();
        this.drawFullTrajectory();
        this.drawTrail();
        this.drawProjectile(currentPoint);
        
        this.currentPointIndex++;
        
        setTimeout(() => {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }, 20);
    }
    
    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        this.isAnimating = false;
        
        this.drawCoordinateSystem();
        this.drawFullTrajectory();
        this.drawTrail();
    }
    
    reset() {
        this.stopAnimation();
        this.trajectory = [];
        this.trailPoints = [];
        this.currentPointIndex = 0;
        this.drawCoordinateSystem();
    }
}

window.BallisticAnimation = BallisticAnimation;