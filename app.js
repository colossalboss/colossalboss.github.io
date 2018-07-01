// buttons
let table = document.getElementById('pixelCanvas');
let save = document.getElementById('download');

//when the save botton is clicked
save.addEventListener('click', function() {
    
	// get size and width of the grid
	let th = table.rows.length;
	let tw = table.rows[0].cells.length;

	// pixelArt object
	let pixelArt = {name: '', data: {}}

	// create array to hold data
	const myData = function(th, tw) {
		for(let i = 0; i < th; i++) {
			pixelArt.data[i] = Array(tw )
		}
		return true;
	}
	myData(Number(th), Number(tw));

	// get file name from prompt value
	let fileName = prompt('File Name');

	// if cancel file name is empty then don't save else save
	if (!fileName) {
		alert('Cancelled');
		return false;
	}

	pixelArt.name = fileName;        

	// get background-color of designed grid and store in an object
	for (let x = 0; x < th; x++) {
		for (let y = 0; y < tw; y++) {
			pixelArt.data[x][y] = table.rows[x].cells[y].style.backgroundColor;
		}
	}

	// save to localStorage
	// Gallery does not exist in localStorage
	if (localStorage.getItem('Gallery') === null) {
		let Gallery = [];
		Gallery.push(pixelArt);
		
		localStorage.setItem('Gallery', JSON.stringify(Gallery));
	} else {
		// Gallery exist in localStorage
		let Gallery = JSON.parse(localStorage.getItem('Gallery'));
		Gallery.push(pixelArt);
		localStorage.setItem('Gallery', JSON.stringify(Gallery));
	}
	
	// call list() function
	list();
        
});

function list() {
	//get Gallery from localStorage
	let Gallery = JSON.parse(localStorage.getItem('Gallery'));

	// field to display list
	let l = document.getElementById('fileList');
	l.innerHTML = '';

	//pass each file addToList()
	Gallery.forEach(function(file) {
		addToList(file);
	});

}

function addToList(file) {
	// select list
	let l = document.getElementById('fileList');

	// create list list item
	let newFile = document.createElement('li');

	// use value from prompt as file name
	newFile.innerHTML = file.name;

	// add eventListener to file
	newFile.addEventListener('click', function() {
			displayFile(file.data);
	})
	l.appendChild(newFile);
}

      
function displayFile(file) {
	// get size of file to be displayed
	let width = file[0].length;
	let size = Object.keys(file);
	let height = size.length;
	
	// remove exiting table if any
	$('tr').remove();

	// create the structure of saved file
	for (let a = 0; a <= height - 1; a++) {
		$('#pixelCanvas').append('<tr id="'+a+'"><td>');
		for (b = 0; b <= width - 2; b++) {
				$('tr:last').append('<td></td>');
		}
	}

	// add the background colors
	for (let m = 0; m <= height - 1; m++) {
		for (let n = 0; n <= width - 2; n++) {
				table.rows[m].cells[n].style.backgroundColor = file[m][n];
		}
	}
		
	// remove existing delete button if any so it doesn't increase in number
	$('#remove').remove();

	// add the delete button
	$('#buttonField').append('<a id="remove">Delete</a>');

	// name to pass to delete function
	let fileName = event.target.innerHTML;  
			
	// add eventListener to delete button and call delete function
	document.getElementById('remove').addEventListener('click', function() {
		deleteFile(file, fileName);
	});
    
}

function deleteFile(file, fileName) {
    // get Gallery from localStorage
	let Gallery = JSON.parse(localStorage.getItem('Gallery'));

	// reduce Gallery to an array of just file names 
	let existingFiles = Gallery.map((f) => f.name);
	
	// get index of file name
	let idx = existingFiles.indexOf(fileName);

	// remove file using index
	Gallery.splice(idx, 1);

	// resetting to localStorage
	localStorage.setItem('Gallery', JSON.stringify(Gallery));

	// call list() again to refresh list on page
	list();

	// clear grid and delete button
	$('tr').remove();
	$('#remove').remove();        
}
        

        
      
      

     
     

