class Cursor {
	constructor(container) {
		this.cursor = container;
		this.canvas = null;
		this.context = null;
		this.width = 150;
		this.height = 150;
		this.clientX = 0;
		this.clientY = 0;
		this.currX = 0;
		this.currY = 0;
		this.angle = 0;
		this.angleTo = 0;
		this.ar = "auto 150 / 150";
		this.beakAnimPercent = 0;
		this.color = {
			r: 255,
			g: 255,
			b: 255,
		};
		this.RAF = null;
		this.init();
	}

	init = () => {
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		this.canvas.id = "cursor-canvas";
		this.cursor.appendChild(this.canvas);
		this.context = this.canvas.getContext("2d");
		document.body.addEventListener("mousemove", this.onMouseMove);
		this.raf();
	}

	draw = () => {
		let t = this.clientX - this.currX,
			e = this.clientY - this.currY;
		if (Math.sqrt(t * t + e * e) > 0.05) {
			this.angleTo = Math.atan2(e, t) - 0.5 * Math.PI;
		}
		this.angle = this.angleTo;
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = "rgb( ".concat(this.color.r, ", ").concat(this.color.g, ", ").concat(this.color.b, " )");
		this.context.save();
		this.context.beginPath();
		this.context.translate(0.5 * this.width, 0.5 * this.height);
		this.context.rotate(this.angle - this.beakAnimPercent * Math.PI * 0.15);
		this.context.moveTo(2 * this.beakAnimPercent - 5 + 8 * this.beakAnimPercent, -5);
		this.context.lineTo(5 - 2 * this.beakAnimPercent + 8 * this.beakAnimPercent, -5);
		this.context.lineTo(0 + 8 * this.beakAnimPercent, 10);
		this.context.closePath();
		this.context.fill();
		this.context.restore();
	}

	onMouseMove = (e) => {
		this.clientX = e.clientX;
		this.clientY = e.clientY;
	}

	onUpdate = () => {
		let t = this.clientX - this.currX,
			n = this.clientY - this.currY,
			i = Math.atan2(n, t),
			r = this.clientX - 50 * Math.cos(i),
			o = this.clientY - 50 * Math.sin(i);
		this.currX += 0.125 * (r - this.currX);
		this.currY += 0.125 * (o - this.currY);
		this.draw();
		let a = this.currX - 0.5 * this.width,
		s = this.currY - 0.5 * this.height;
		this.cursor.style.transform = "translate3d( ".concat(a, "px, ").concat(s, "px, 0 )");
		this.raf();
	}

	raf() {
		this.RAF = requestAnimationFrame(this.onUpdate);
	}
}

const cursorContainer = document.getElementById('cursor');
const cursor = new Cursor(cursorContainer);