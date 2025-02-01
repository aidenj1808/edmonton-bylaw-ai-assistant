

function searchPDFs(){
    // Finds Searchbar and Pdfs and stores them
    var search = document.getElementById("searchInput");
    var pdfs = document.getElementsByClassName("pdf");
    // for each item in pdfs
    for (var i = 0; i < pdfs.length; i++){
        var pdf = pdfs[i];
        // format fileName from pdf's data 
        var fileName = pdf.data.split("/")[pdf.data.split("/").length-1].split("_").join(" ");
        // console.log(fileName);
        // console.log(search.value);
        // console.log(fileName.search(search.value));
        // compares fileName to search value and hides/shows respective pdf
        if (fileName.search(search.value) >= 1 || search.value == ""){
            pdf.style.display = "inline";
            // console.log("showing: " + fileName);
        }
        else{
            pdf.style.display = "none";
            // console.log("hiding: " + fileName);
        }
    }
}