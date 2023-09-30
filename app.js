$(document).ready(function () {
   
    const movies = [];

    
    function showMovieList() {
        $("#movieList").empty();

        
        const sortCriteria = $("#sortCriteria").val();

        if(movies.length < 2){
            $('#sortCriteria').hide();
        }else{
            $('#sortCriteria').show();
        }


        if (sortCriteria === "title-asc") {
            movies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortCriteria === "title-desc") {
            movies.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortCriteria === "rating-asc") {
            movies.sort((a, b) => a.rating - b.rating);
        } else if (sortCriteria === "rating-desc") {
            movies.sort((a, b) => b.rating - a.rating);
        }

        
        movies.forEach(movie => {
            const $movieItem = $("<div>").addClass("movie-item");
            $movieItem.append($("<span>").text("Title: " + movie.title));
            $movieItem.append($("<span>").text("Rating: " + movie.rating));
            const $removeButton = $("<button>").text("Remove");
            $removeButton.click(function () {
                $movieItem.remove();
                
                const index = movies.indexOf(movie);
                if (index !== -1) {
                    movies.splice(index, 1);
                }
                showMovieList();

            });
            $movieItem.append($removeButton);
            $("#movieList").append($movieItem);
        });
    }

    
    $("#movieForm").submit(function (event) {
        event.preventDefault();

        const title = $("#title").val();
        const rating = parseFloat($("#rating").val()); 

        if (title.length < 2) {
            alert("Title must have at least 2 characters.");
            return;
        }

        
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert("Rating must be a number between 0 and 10.");
            return;
        }

        
        movies.push({ title, rating });

        
        showMovieList();

        // Reset the form inputs
        $("#title").val("");
        $("#rating").val("");
    });

    showMovieList();
    
    $("#sortCriteria").change(showMovieList);
});
