import { Component, OnInit } from '@angular/core';
import { Square } from 'src/app/models/square';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

	map: Array<Array<Square>>;

	readonly shipsSizesToPlace: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

	private readonly width: number = 10;
	private readonly height: number = 10;

	private newShipStartCoords: Array<number> | null = null;

	constructor() {
		this.map = new Array<Array<Square>>();

		for (let i = 0; i < this.width; i++) {
			const row = new Array<Square>();
			this.map.push(row);

			for (let j = 0; j < this.height; j++) {
				row.push(new Square());
			}
		}
	}

	ngOnInit(): void {
	}

	onSquareClicked(square: Square): void {
		const squareCoords = this.getCoords(square);

		if (this.newShipStartCoords === null) {
			square.value = 'b';

			this.newShipStartCoords = squareCoords;
		} else {
			const shipSize = this.shipsSizesToPlace.shift()!;

			if (this.newShipStartCoords![0] < squareCoords![0]) {
				for (let i = 0; i < shipSize; i++) {
					this.map[this.newShipStartCoords![1]][i + this.newShipStartCoords![0]].value = 'b';
				}
			} else {
				for (let i = 0; i < shipSize; i++) {
					this.map[i + this.newShipStartCoords![1]][this.newShipStartCoords![0]].value = 'b';
				}
			}

			this.newShipStartCoords = null;
		}
	}

	// ToDo: Rewrite function
	private getCoords(square: Square): Array<number> | null {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				if (this.map[i][j] === square) {
					return [j, i];
				}
			}
		}

		return null;
	}

}
