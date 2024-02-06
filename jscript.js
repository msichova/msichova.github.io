
function includeHtmlDoc(inElement, page)
{
    $(document.getElementById(inElement)).load(page);
   /* $("#" + inElement).load(page);*/
}

function accordion()
{
    var accardion = document.getElementsByClassName("accordion");
    var index;
                                
    for (index = 0; index < accardion.length; index++) 
    {
        accardion[index].addEventListener("click", 
        function() 
        {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") 
            {
                panel.style.display = "none";
            } else 
            {
                panel.style.display = "block";
            }
        });
    }
}

/*Currently not working as expected */
function navBar(navigation)
{
     document.getElementsByClassName('nav-item').forEach(element =>
        {
        if(element.id === navigation){
            element.classList.add('active');
        }
        else
        {
            element.classList.remove('active');
        }
    });
}