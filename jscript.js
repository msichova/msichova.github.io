
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
            this.classList.toggle('active');
            
            var panel = this.nextElementSibling;
            if (panel.style.display === 'block') 
            {
                panel.style.display = 'none';
            } 
            else 
            {
                panel.style.display = 'block';
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

function accordionForSkills()
{
    var accardion = document.getElementsByClassName("accordion-skills");
    var index;
                                
    for (index = 0; index < accardion.length; index++) 
    {
        accardion[index].addEventListener("click", 
        function() 
        {
            this.classList.toggle('active-skills');
            
            var panel = this.nextElementSibling;
            if (panel.style.display === 'block') 
            {
                panel.style.display = 'none';
            } 
            else 
            {
                panel.style.display = 'block';
            }
        });
    }
}

function selfPrintitngText(elementId, delay, text)
{
    var element = document.getElementById(elementId);
    var carret = '_';
    var print_text = function(textToTrim, element, delay)
    {
        if(textToTrim.length > 0)
        {
            if(textToTrim.length != 0)
            {
                element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length-1); 
            }

            if(textToTrim[0] != '<')
            {
                element.innerHTML += textToTrim[0] + carret;
            }
            
            if(textToTrim[0] === '<')
            {
                textToTrim = textToTrim.substring(4, textToTrim.length + 1);
                element.innerHTML += '<br>' + textToTrim[0] + carret;
            }
        
            setTimeout(function()
            {
                print_text(textToTrim.slice(1), element, delay);
            }, delay );
        }
        else
        {
            element.innerHTML = text;
        }
    }
    print_text(text, element, delay);
    
}

function changeDownloadLogo(elementId, delay)
{
    var element = document.getElementById(elementId);

    if(element.parentElement.onmouseenter)
    {
        element.src = "./icons8-downloads-folder.gif";
        
        setTimeout(function()
        {
            element.src = "./icons8-downloads-folder-50.png";
        }, (delay));
        
    }
}


