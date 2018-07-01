$(document).ready(function() {
	//Call makeGrid() when form is submitted
	$('#sizePicker').submit(function makeGrid(grid) {

		//Declare N by M variables
		const height = $('#inputHeight').val();
		const width = $('#inputWeight').val();

		$('#remove').remove(); //clears delete button
		$('#pixelCanvas tr').remove(); //Clears grid

		// Create the grid with nested for loop
		for (let row = 1; row <= height; row++) {
			$('#pixelCanvas').append('<tr data-id="x"></tr>');
			for (let col = 1; col <= width; col++) {
				$('tr:last').append('<td data-id="'+col+'"></td>');
				$('td').attr('class', 'box');  //Adds the class box to the boxes in the grid
			}
		}

		//prevent form from submitting
		grid.preventDefault();

		//Change background color of grid boxes on click
		$('.box').click(function addColor() {
			const color = $('#colorPicker').val();
			if ($(this).attr('style')) {
				$(this).removeAttr('style');
			} else {
				$(this).attr('style', 'background-color: ' + color);
			}
		});

  });
});
    