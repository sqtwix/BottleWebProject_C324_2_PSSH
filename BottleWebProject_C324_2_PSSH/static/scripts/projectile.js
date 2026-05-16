/**
 * Баллистический калькулятор - анимация полета
 */

class ProjectileAnimation {
    constructor() {
        this.trajectory = [];
        this.animationFrame = null;
        this.currentPointIndex = 0;
        this.isAnimating = false;
        this.trailPoints = [];
    }
    
    updateTrajectory(trajectory, maxRange, maxHeight) {
        this.trajectory = trajectory;
        this.currentPointIndex = 0;
        this.trailPoints = [];
        
        this.scrollToGraph();
        
        if (window.coordinatePlane) {
            window.coordinatePlane.reset();
            window.coordinatePlane.drawFullTrajectory(trajectory);
            window.coordinatePlane.drawStartPoint();
        }
        
        setTimeout(() => {
            this.startAnimation();
        }, 500);
    }
    
    scrollToGraph() {
        const graphContainer = document.querySelector('.graph-container');
        if (graphContainer) {
            const offset = 100;
            const elementPosition = graphContainer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        if (!this.trajectory || this.trajectory.length === 0) return;
        
        this.isAnimating = true;
        this.currentPointIndex = 0;
        this.trailPoints = [];
        this.animate();
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        if (this.currentPointIndex >= this.trajectory.length) {
            this.stopAnimation();
            return;
        }
        
        const currentPoint = this.trajectory[this.currentPointIndex];
        this.trailPoints.push(currentPoint);
        
        if (window.coordinatePlane) {
            window.coordinatePlane.drawPlane();
            window.coordinatePlane.drawFullTrajectory(this.trajectory);
            window.coordinatePlane.drawTrail(this.trailPoints);
            window.coordinatePlane.drawProjectile(currentPoint);
            window.coordinatePlane.drawStartPoint();
        }
        
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
        
        if (window.coordinatePlane) {
            window.coordinatePlane.drawPlane();
            window.coordinatePlane.drawFullTrajectory(this.trajectory);
            window.coordinatePlane.drawTrail(this.trailPoints);
            window.coordinatePlane.drawStartPoint();
        }
    }
    
    reset() {
        this.stopAnimation();
        this.trajectory = [];
        this.trailPoints = [];
        this.currentPointIndex = 0;
        if (window.coordinatePlane) {
            window.coordinatePlane.reset();
        }
    }
}

window.ProjectileAnimation = ProjectileAnimation;
window.projectileAnimation = new ProjectileAnimation();